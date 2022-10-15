import React, { ChangeEvent, useState } from 'react';
import Search from 'assets/search.svg';
import useDebounce from 'hooks/useDebounce';
import { useQuery } from 'react-query';
import SearchItem from './SearchItem';
import { fetchBooks } from 'service/books';
interface SearchFormProps {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	mobile?: boolean;
}

const SearchForm = ({ mobile, isOpen, setIsOpen }: SearchFormProps) => {
	const [searchValue, setSearchValue] = useState('');

	const debouncedSearchValue = useDebounce(searchValue, 300);
	const { isLoading, isError, isSuccess, data } = useQuery(
		['q=', debouncedSearchValue],
		() => fetchBooks(debouncedSearchValue),
		{
			enabled: debouncedSearchValue.length > 0,
		}
	);

	const handleChange = ({
		target: { value },
	}: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(value);
	};

	if (!isOpen && mobile) {
		return null;
	}

	return (
		<>
			<div className={`relative ${!mobile && 'sm:w-[25rem] lg:w-[30rem]'}`}>
				<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none focus-visible:outline-none">
					<Search className="font-semibold text-gray-500" />
				</div>
				<form onSubmit={(e) => e.preventDefault()}>
					<input
						className="block w-full p-4 pl-10 text-base text-white bg-gray-700 border border-gray-600 rounded-lg focus-visible:outline-none"
						placeholder="Search"
						onFocus={() => {
							setIsOpen(true);
						}}
						onChange={handleChange}
						value={searchValue}
					/>
					<button
						type="button"
						className="text-white absolute right-2.5 bottom-2.5 bg-primary font-medium rounded-lg text-sm px-4 py-2 focus-visible:outline-none"
					>
						<Search className="text-white" />
					</button>
				</form>
			</div>
			{isOpen && (
				<div className="z-50">
					<div
						className={`block bg-gray-700 rounded-lg max-h-96 overflow-y-auto ${
							!mobile && 'sm:w-[25rem] lg:w-[30rem]'
						}`}
					>
						{isLoading && (
							<p className="pl-10 text-xl text-white">Loading...</p>
						)}
						{isError && <p className="pl-10 text-xl text-white">Error</p>}
						{isSuccess &&
							data?.items?.map(({ id, volumeInfo: { title } }) => {
								return (
									<SearchItem
										key={id}
										id={id}
										title={title}
										author={''}
										// onClick={() => {
										// 	setIsOpen(false);
										// }}
									/>
								);
							})}
					</div>
				</div>
			)}
		</>
	);
};

export default SearchForm;
