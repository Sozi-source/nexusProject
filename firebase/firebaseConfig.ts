// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlFOWHNbBZD43776ypUHMyWYyVl2XORIE",
  authDomain: "eco-duka.firebaseapp.com",
  projectId: "eco-duka",
  storageBucket: "eco-duka.appspot.com",
  messagingSenderId: "352523062618",
  appId: "1:352523062618:web:cf354e61677b9204037763",
  measurementId: "G-TBRDGX0R5R"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app)
export const storage = getStorage(app)
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;


export default app;