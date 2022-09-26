import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  FacebookAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpp2AAU8HxZVZiLoDJBCTq9tomYWm4LCE",
  authDomain: "your-books-5893e.firebaseapp.com",
  projectId: "your-books-5893e",
  storageBucket: "your-books-5893e.appspot.com",
  messagingSenderId: "632523389162",
  appId: "1:632523389162:web:65b080b39bdcdd5c123f93"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();

const googleLogin = (cb) => {
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

const facebookLogin = (cb) => {
  signInWithPopup(auth, fbProvider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;
      cb();
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      alert(errorMessage);
      // const email = error.email;
      // The AuthCredential type that was used.
      // const credential = FacebookAuthProvider.credentialFromError(error);
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

const logout = (cb) => {
  signOut(auth);
  cb();
};

export {
  auth,
  db,
  googleLogin,
  facebookLogin,
  emailLogin,
  emailRegister,
  logout,
};