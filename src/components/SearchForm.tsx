import React from 'react';
import Search from 'assets/search.svg';

interface SearchFormProps {
	mobile?: boolean;
}

const SearchForm = ({ mobile }: SearchFormProps) => {
	return (
		<div className={`relative ${!mobile && 'sm:w-[25rem] lg:w-[30rem]'}`}>
			<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none focus-visible:outline-none">
				<Search className="font-semibold text-gray-500" />
			</div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					console.log('submit');
				}}
			>
				<input
					className="block w-full p-4 pl-10 text-base text-white bg-gray-700 border border-gray-600 rounded-lg focus-visible:outline-none"
					placeholder="Search"
				/>
				<button
					type="submit"
					className="text-white absolute right-2.5 bottom-2.5 bg-primary font-medium rounded-lg text-sm px-4 py-2 focus-visible:outline-none"
				>
					<Search className="text-white" />
				</button>
			</form>
		</div>
	);
};

export default SearchForm;
