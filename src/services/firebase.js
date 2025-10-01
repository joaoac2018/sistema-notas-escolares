// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD9R8RbFoPKRCAN1A_T4mVaDa55S7w3CDQ",
  authDomain: "sistema-notas-d56d4.firebaseapp.com",
  projectId: "sistema-notas-d56d4",
 storageBucket: "sistema-notas-d56d4.appspot.com",
  messagingSenderId: "741397732481",
  appId: "1:741397732481:web:9e7a6710a81a1e56cd0180"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };