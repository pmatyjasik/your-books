import type { BookColumns } from './types';

export const emptyBookColumns: BookColumns = {
	ToRead: {
		name: 'To Read',
		items: [],
	},
	Reading: {
		name: 'Reading',
		items: [],
	},
	Read: {
		name: 'Read',
		items: [],
	},
};
