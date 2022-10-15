interface Book {
	id: string;
	volumeInfo: {
		title: string;
		authors: string[];
		categories: string[];
		publishedDate: number;
		description: string;
		imageLinks?: { smallThumbnail: URL; thumbnail: URL };
	};
}
interface SearchResponse {
	items?: Book[];
}

export type { Book, SearchResponse };
