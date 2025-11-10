// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbVATQBYklBX6uUWJ2uxpTTgvEgnLe1Iw",
  authDomain: "community-issuse.firebaseapp.com",
  projectId: "community-issuse",
  storageBucket: "community-issuse.firebasestorage.app",
  messagingSenderId: "1017499557093",
  appId: "1:1017499557093:web:23eab76562280e152cc80c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);