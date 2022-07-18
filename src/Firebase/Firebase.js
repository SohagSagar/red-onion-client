// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJdYh8aRNrF_l2U_w-mutIQ9rugEy9w5M",
    authDomain: "red-onion-4b109.firebaseapp.com",
    projectId: "red-onion-4b109",
    storageBucket: "red-onion-4b109.appspot.com",
    messagingSenderId: "40892745665",
    appId: "1:40892745665:web:4f1f451313d0c79b0a5140"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;