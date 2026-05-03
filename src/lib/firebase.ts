// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzay9VlO7Jg4U2nk6QdEkqcceYxlB-pm8",
  authDomain: "munsync.firebaseapp.com",
  projectId: "munsync",
  storageBucket: "munsync.firebasestorage.app",
  messagingSenderId: "749851746783",
  appId: "1:749851746783:web:ea4a6177b397dd6e57e46a",
  measurementId: "G-C2XGC0DW7V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };