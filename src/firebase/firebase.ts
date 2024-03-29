import { initializeApp } from 'firebase/app';
import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	FacebookAuthProvider,
} from 'firebase/auth';
import {
	getFirestore,
	getDoc,
	setDoc,
	updateDoc,
	doc,
	collection,
	getDocs,
	deleteDoc,
	orderBy,
	query,
} from 'firebase/firestore';
import { emptyBookColumns } from 'service/Books/utils';
import type { BookColumns } from 'service/Books/types';
import { Book, BookStatus, userDataInterface } from '../firebase/types';

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const signInWithGoogle = async () => {
	try {
		const res = await signInWithPopup(auth, googleProvider);
		const user = res.user;
		const docs = await getDoc(doc(db, 'Users', user.uid));
		if (!docs.exists()) {
			await setDoc(doc(db, 'Users', user.uid), <userDataInterface>{
				displayName: user.displayName,
				uid: user.uid,
				authProvider: 'Google',
				email: user.email,
			});
		}
	} catch (err) {
		console.error(err);
	}
};

const signInWithFacebook = async () => {
	try {
		const res = await signInWithPopup(auth, facebookProvider);
		const user = res.user;
		const docs = await getDoc(doc(db, 'Users', user.uid));
		if (!docs.exists()) {
			await setDoc(doc(db, 'Users', user.uid), <userDataInterface>{
				displayName: user.displayName,
				uid: user.uid,
				authProvider: 'Facebook',
				email: user.email,
			});
		}
	} catch (err) {
		console.error(err);
	}
};

const signInWithCredentials = async (email: string, password: string) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (err) {
		console.error(err);
	}
};

const signUpWithCredentials = async (
	email: string,
	password: string,
	firstName: string,
	lastName: string
) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		const user = res.user;
		const docs = await getDoc(doc(db, 'Users', user.uid));
		if (!docs.exists()) {
			await setDoc(doc(db, 'Users', user.uid), <userDataInterface>{
				displayName: `${firstName} ${lastName}`,
				uid: user.uid,
				authProvider: 'emailAndPassword',
				email: user.email,
			});
		}
	} catch (err) {
		console.error(err);
	}
};

const handleLougout = () => {
	signOut(auth);
};

const addBookToCollection = async ({
	bookID,
	image,
	status,
	title,
	userUID,
	reccomendation,
	note,
}: Book) => {
	try {
		await setDoc(doc(db, 'Users', userUID, 'Books', bookID), {
			bookID: bookID,
			title: title,
			image: image,
			status: status,
			reccomendation: reccomendation,
			note: note,
			date: new Date(),
		});
	} catch (err) {
		console.error(err);
	}
};

const deleteBookFromCollection = async (bookID: string, userUID: string) => {
	try {
		await deleteDoc(doc(db, 'Users', userUID, 'Books', bookID));
	} catch (err) {
		console.error(err);
	}
};

const updateBookStatusInCollection = async (
	bookId: string,
	status: BookStatus
) => {
	const userUID = auth.currentUser?.uid;
	if (!userUID) {
		return;
	}
	try {
		await updateDoc(doc(db, 'Users', userUID, 'Books', bookId), { status });
	} catch (err) {
		console.error(err);
	}
};

const updateBookReccomendationInCollection = async (
	bookId: string,
	reccomendation: boolean
) => {
	const userUID = auth.currentUser?.uid;
	if (!userUID) {
		return;
	}
	try {
		await updateDoc(doc(db, 'Users', userUID, 'Books', bookId), {
			reccomendation,
		});
	} catch (err) {
		console.error(err);
	}
};

const updateBookNoteInCollection = async (
	bookId: string,
	note: string | undefined
) => {
	const userUID = auth.currentUser?.uid;
	if (!userUID) {
		return;
	}
	try {
		await updateDoc(doc(db, 'Users', userUID, 'Books', bookId), { note });
	} catch (err) {
		console.error(err);
	}
};

const objectKeys = <Obj extends {}>(obj: Obj): (keyof Obj)[] => {
	return Object.keys(obj) as (keyof Obj)[];
};

const getBooksFromCollection = async () => {
	const userUID = auth.currentUser?.uid;
	if (!userUID) {
		return;
	}
	try {
		const anserwsCollectionRef = collection(db, 'Users', userUID, 'Books');
		const anserwsQuery = query(anserwsCollectionRef, orderBy('date', 'desc'));

		const answersData = await getDocs(anserwsQuery);

		const data = answersData.docs.map((doc) => doc.data()) as Book[];
		const columnsObject: BookColumns = emptyBookColumns;
		objectKeys(BookStatus).forEach((key) => {
			const columnData = data.filter((item) => item.status === BookStatus[key]);
			columnsObject[key] = {
				name: key,
				items: columnData,
			};
		});
		return columnsObject;
	} catch (err) {
		console.error(err);
	}
};

const getBookFromCollection = async (bookID: string) => {
	const userUID = auth.currentUser?.uid;
	if (!userUID) {
		return;
	}
	try {
		const docs = await getDoc(doc(db, 'Users', userUID, 'Books', bookID));
		return docs.data();
	} catch (err) {
		console.error(err);
	}
};

const isBookAdded = async (bookID: string, userUID: string) => {
	try {
		const res = await getDoc(doc(db, 'Users', userUID, 'Books', bookID));
		return res.exists();
	} catch (err) {
		console.error(err);
		return false;
	}
};

const getUserData = async () => {
	const userUID = auth.currentUser?.uid;
	if (!userUID) {
		return;
	}
	try {
		const docs = await getDoc(doc(db, 'Users', userUID));
		return docs;
	} catch (err) {
		console.error(err);
	}
};

export {
	auth,
	db,
	signInWithGoogle,
	getBooksFromCollection,
	signInWithFacebook,
	signInWithCredentials,
	signUpWithCredentials,
	handleLougout,
	addBookToCollection,
	deleteBookFromCollection,
	updateBookStatusInCollection,
	isBookAdded,
	getUserData,
	getBookFromCollection,
	updateBookNoteInCollection,
	updateBookReccomendationInCollection,
};
