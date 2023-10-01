import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAQ2RluoAGn6nClENBNTT0wQiaaluCqc-o",
  authDomain: "aamango-ec8b7.firebaseapp.com",
  projectId: "aamango-ec8b7",
  storageBucket: "aamango-ec8b7.appspot.com",
  messagingSenderId: "109174202937",
  appId: "1:109174202937:web:b97c0ad6dfda31d04423e8",
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);

