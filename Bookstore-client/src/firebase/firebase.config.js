// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbmKYgK0cYSSTvWu-gTan_Ln2NwAgLT98",
  authDomain: "online-bookstore-app.firebaseapp.com",
  projectId: "online-bookstore-app",
  storageBucket: "online-bookstore-app.appspot.com",
  messagingSenderId: "265637451076",
  appId: "1:265637451076:web:58683242c7b126384c3311"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;