export interface Book {
	bookID: string;
	userUID: string;
	status: BookStatus;
	title: string;
	image: string;
}

export enum BookStatus {
	ToRead = 'toRead',
	Reading = 'reading',
	Read = 'read',
}

export interface userDataInterface {
	email: string;
	authProvider: string;
	displayName: string;
	uid: string;
}
