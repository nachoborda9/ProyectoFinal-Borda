import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDGWmwlvw8spzT7ZJnTRj65VgnAp4Yym40',
  authDomain: 'proyecto-coder-igb.firebaseapp.com',
  projectId: 'proyecto-coder-igb',
  storageBucket: 'proyecto-coder-igb.firebasestorage.app',
  messagingSenderId: '763701114102',
  appId: '1:763701114102:web:83880a328b41783f3368d7',
  measurementId: 'G-7539Q75NMQ',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
