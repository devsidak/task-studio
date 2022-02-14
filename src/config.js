// Import the functions you need from the SDKs you need
import { getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAH8OrOgE562FsN8JTfvXm0-MlInRW1e2o",
  authDomain: "taskstodo8685.firebaseapp.com",
  projectId: "taskstodo8685",
  storageBucket: "taskstodo8685.appspot.com",
  messagingSenderId: "63140017106",
  appId: "1:63140017106:web:8eaff4716b535a03bece0b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
 const auth = getAuth(app);

export { db, auth };
