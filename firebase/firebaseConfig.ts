import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDlFOWHNbBZD43776ypUHMyWYyVl2XORIE",
  authDomain: "eco-duka.firebaseapp.com",
  projectId: "eco-duka",
  storageBucket: "eco-duka.appspot.com",
  messagingSenderId: "352523062618",
  appId: "1:352523062618:web:cf354e61677b9204037763",
  measurementId: "G-TBRDGX0R5R",
};

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Analytics (browser-only)
export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;

export default app;
