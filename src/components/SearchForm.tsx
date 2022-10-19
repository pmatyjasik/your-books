import React, { ChangeEvent, useState } from 'react';
import Search from 'assets/search.svg';
import useDebounce from 'hooks/useDebounce';
import { useQuery } from 'react-query';
import SearchItem from './SearchItem';
import { fetchBooks } from 'service/books';
import { SpinnerCircular } from 'spinners-react';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';

interface SearchFormProps {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	mobile?: boolean;
}

const SearchForm = ({ mobile, isOpen, setIsOpen }: SearchFormProps) => {
	const [searchValue, setSearchValue] = useState('');
	const [startIndex, setStartIndex] = useState(0);

	const debouncedSearchValue = useDebounce(searchValue, 300);
	const { isLoading, isError, isSuccess, data } = useQuery(
		[`q=${debouncedSearchValue}`, startIndex],
		() => fetchBooks(debouncedSearchValue, startIndex),
		{
			enabled: debouncedSearchValue.length > 0,
		}
	);

	const handleChange = ({
		target: { value },
	}: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(value);
		setStartIndex(0);
	};

	if (!isOpen && mobile) {
		return null;
	}

	return (
		<div className="z-50">
			<div className={`relative ${!mobile && 'sm:w-[25rem] lg:w-[30rem]'} `}>
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
				<>
					<div
						className={`scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg bg-gray-700 rounded-lg max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary${
							!mobile && 'sm:w-[25rem] lg:w-[30rem]'
						}`}
					>
						{isLoading && (
							<p className="flex justify-center">
								<SpinnerCircular
									size={40}
									thickness={180}
									speed={270}
									color="#355FE5"
									secondaryColor="#111827"
								/>
							</p>
						)}
						{isError && (
							<p className="pl-10 text-xl text-center text-white">
								Ops! Something go wrong.
							</p>
						)}
						{isSuccess &&
							data?.items?.map(
								({
									id,
									volumeInfo: { title, publishedDate, authors, imageLinks },
								}) => {
									return (
										<SearchItem
											key={id}
											id={id}
											title={title}
											authors={authors}
											publishedDate={publishedDate}
											imageLinks={imageLinks}
											onClick={() => {
												setIsOpen(false);
											}}
										/>
									);
								}
							)}

						{isSuccess && (
							<div className="flex items-center justify-between px-10 my-2">
								<GoArrowLeft
									onClick={() =>
										setStartIndex((prev) => {
											return prev < 20 ? 0 : prev - 10;
										})
									}
									className="text-white w-[25px] h-[35px]"
								/>

								<GoArrowRight
									onClick={() => setStartIndex((prev) => prev + 10)}
									className="text-white w-[25px] h-[35px]"
								/>
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default SearchForm;
