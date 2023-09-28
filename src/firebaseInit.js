// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzqLsflCgyo4TMDg5UlA7KBUaxuYcHKDw",
  authDomain: "blogging-app-debba.firebaseapp.com",
  projectId: "blogging-app-debba",
  storageBucket: "blogging-app-debba.appspot.com",
  messagingSenderId: "605713750141",
  appId: "1:605713750141:web:2241ebccd3d7c047d03914"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);