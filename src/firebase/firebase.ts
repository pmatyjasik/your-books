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
import { Book, BookStatus } from '../firebase/types';

const firebaseConfig = {
	apiKey: 'AIzaSyDpp2AAU8HxZVZiLoDJBCTq9tomYWm4LCE',
	authDomain: 'your-books-5893e.firebaseapp.com',
	projectId: 'your-books-5893e',
	storageBucket: 'your-books-5893e.appspot.com',
	messagingSenderId: '632523389162',
	appId: '1:632523389162:web:65b080b39bdcdd5c123f93',
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
			await setDoc(doc(db, 'Users', user.uid), {
				uid: user.uid,
				authProvider: 'google',
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
			await setDoc(doc(db, 'Users', user.uid), {
				uid: user.uid,
				authProvider: 'facebook',
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

const signUpWithCredentials = async (email: string, password: string) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		const user = res.user;
		const docs = await getDoc(doc(db, 'Users', user.uid));
		if (!docs.exists()) {
			await setDoc(doc(db, 'Users', user.uid), {
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
}: Book) => {
	try {
		await setDoc(doc(db, 'Users', userUID, 'Books', bookID), {
			bookID: bookID,
			title: title,
			image: image,
			status: status,
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

const updateBookInCollection = async (bookId: string, status: BookStatus) => {
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

const objectKeys = <Obj extends {}>(obj: Obj): (keyof Obj)[] => {
	return Object.keys(obj) as (keyof Obj)[];
};

const getBooksFromCollection = async (userUID: string) => {
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

const isBookAdded = async (bookID: string, userUID: string) => {
	try {
		const res = await getDoc(doc(db, 'Users', userUID, 'Books', bookID));
		return res.exists();
	} catch (err) {
		console.error(err);
		return false;
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
	updateBookInCollection,
	isBookAdded,
};
