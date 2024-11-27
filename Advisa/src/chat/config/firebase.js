import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} from '@env';

// Firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyBA4GMFRQQeTbQjE4t4XO1nGAvKS9qWkvk",
//   authDomain: "advisa-1dd90.firebaseapp.com",
//   projectId: "advisa-1dd90",
//   storageBucket: "advisa-1dd90.firebasestorage.app",
//   messagingSenderId: "644316079915",
//   appId: "1:644316079915:web:679ffd97d7962985e1876e"
// };
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID
};

// initialize firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
