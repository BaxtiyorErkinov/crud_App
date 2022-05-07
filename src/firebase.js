import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyArjjFjt7XhLTacneHMv6bkNk3e2HM6rgM",
  authDomain: "crud-fe3a5.firebaseapp.com",
  projectId: "crud-fe3a5",
  storageBucket: "crud-fe3a5.appspot.com",
  messagingSenderId: "613898129931",
  appId: "1:613898129931:web:cafa55a531e350b5386d0e"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);