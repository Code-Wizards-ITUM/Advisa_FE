import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBA4GMFRQQeTbQjE4t4XO1nGAvKS9qWkvk",
  authDomain: "advisa-1dd90.firebaseapp.com",
  projectId: "advisa-1dd90",
  storageBucket: "advisa-1dd90.firebasestorage.app",
  messagingSenderId: "644316079915",
  appId: "1:644316079915:web:679ffd97d7962985e1876e"
};

// initialize firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
