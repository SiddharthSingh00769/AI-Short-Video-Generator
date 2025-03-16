// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAYEgP08WpM05UP8DU1ACkPlS_H3mul0o",
  authDomain: "ai-video-generator-c832d.firebaseapp.com",
  projectId: "ai-video-generator-c832d",
  storageBucket: "ai-video-generator-c832d.firebasestorage.app",
  messagingSenderId: "99623955857",
  appId: "1:399623955857:web:f30e54629d3759f5bd6630",
  measurementId: "G-Z8PH1CYDN5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);