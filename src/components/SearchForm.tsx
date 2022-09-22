import React from 'react';
import Search from 'assets/search.svg';

const SearchForm = () => {
	return (
		<>
			<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
				<Search className="font-semibold text-gray-500" />
			</div>
			<input
				className="block w-full p-4 pl-10 text-base text-white bg-gray-700 border border-gray-600 rounded-lg"
				placeholder="Wyszukiwarka"
			/>
			<button className="text-white absolute right-2.5 bottom-2.5 bg-primary font-medium rounded-lg text-sm px-4 py-2">
				<Search className="text-white" />
			</button>
		</>
	);
};

export default SearchForm;
