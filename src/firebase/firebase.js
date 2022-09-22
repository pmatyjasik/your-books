import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: 'AIzaSyBXfLzNV0g7bD3e4zVLMqBC5PKL7IhlOGs',
	authDomain: 'booklog-f0b07.firebaseapp.com',
	projectId: 'booklog-f0b07',
	storageBucket: 'booklog-f0b07.appspot.com',
	messagingSenderId: '643523636614',
	appId: '1:643523636614:web:4dab16ace3a82bb8ae5007',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const GoogleLogin = (cb) => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      cb();
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};


const emailLogin = (cb) => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      cb();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      console.log(errorCode, errorMessage);
    });
};

const emailRegister = (cb) => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      cb();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  GoogleLogin,
  emailLogin,
  emailRegister,
  logout,
};