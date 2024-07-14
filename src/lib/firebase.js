import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chat-app-890f2.firebaseapp.com",
  projectId: "chat-app-890f2",
  storageBucket: "chat-app-890f2.appspot.com",
  messagingSenderId: "769328337796",
  appId: "1:769328337796:web:25b17148dead6ad132c3d1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();