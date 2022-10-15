import { SearchResponse } from './types';

export const fetchBooks = async (
	queryParam: string
): Promise<SearchResponse> => {
	const res = await fetch(
		`https://www.googleapis.com/books/v1/volumes?q=${queryParam}`
	);
	return res.json();
};
