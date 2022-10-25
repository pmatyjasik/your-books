import type { Book, BookStatus } from '../../firebase/types';

export type BookColumnItem = { name: string; items: Book[] };
export type BookColumns = Record<keyof typeof BookStatus, BookColumnItem | {}>;

export const isValidColumn = (
	column: BookColumnItem | {}
): column is BookColumnItem => {
	return 'name' in column;
};
