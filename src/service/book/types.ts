interface Book {
	id: string;
	volumeInfo: {
		title: string;
		authors: string[];
		categories: string[];
		publishedDate: string;
		description: string;
		imageLinks?: {
			thumbnail: string;
		};
	};
}
interface SearchResponse {
	items?: Book[];
}

export type { Book, SearchResponse };
