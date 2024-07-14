// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1fqg47QRUkkzFfVaXNY60C3M2ZxcCrcI",
  authDomain: "authentication-app-4bee1.firebaseapp.com",
  projectId: "authentication-app-4bee1",
  storageBucket: "authentication-app-4bee1.appspot.com",
  messagingSenderId: "157936417287",
  appId: "1:157936417287:web:1efe7cf2cba60d9c58c8a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);