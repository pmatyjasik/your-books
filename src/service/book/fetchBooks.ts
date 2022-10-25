import { SearchResponse } from './types';

export const fetchBooks = async (
	queryParam: string,
	startIndex: number
): Promise<SearchResponse> => {
	const res = await fetch(
		`https://www.googleapis.com/books/v1/volumes?q=${queryParam}&startIndex=${startIndex}`
	);
	return res.json();
};

export const fetchBook = async (id: string) => {
	const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
	return res.json();
};
