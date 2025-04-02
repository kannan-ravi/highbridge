// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwgXG4AynzR9hzzHNS09qXCZmoXEk_QSY",
  authDomain: "workflow-management-c5f8e.firebaseapp.com",
  projectId: "workflow-management-c5f8e",
  storageBucket: "workflow-management-c5f8e.firebasestorage.app",
  messagingSenderId: "923736890357",
  appId: "1:923736890357:web:28a6fe42764cc0bfebdebc",
  measurementId: "G-CFB4BS0PSG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
