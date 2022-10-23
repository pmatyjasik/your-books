import { initializeApp } from 'firebase/app';
import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	FacebookAuthProvider,
	updateProfile,
} from 'firebase/auth';
import { getFirestore, getDoc, setDoc, doc } from 'firebase/firestore';

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

export {
	auth,
	db,
	signInWithGoogle,
	signInWithFacebook,
	signInWithCredentials,
	signUpWithCredentials,
	handleLougout,
};
