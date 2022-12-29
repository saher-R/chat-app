import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "chat-app-ac0ae.firebaseapp.com",
  projectId: "chat-app-ac0ae",
  storageBucket: "chat-app-ac0ae.appspot.com",
  messagingSenderId: "129563039598",
  appId: process.env.REACT_APP_FIREBASE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
