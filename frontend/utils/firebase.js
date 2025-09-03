
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginvirtualcourses-81a16.firebaseapp.com",
  projectId: "loginvirtualcourses-81a16",
  storageBucket: "loginvirtualcourses-81a16.firebasestorage.app",
  messagingSenderId: "134077395119",
  appId: "1:134077395119:web:6ce79887a0a0abec72245a"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider()

export {auth,provider};