import  { initializeApp, getApp, getApps } from 'firebase/app';
import  { getFirestore }  from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlND8uYhsBYvXh4UT5rCm-iKoKgOJAvpw",
  authDomain: "chatgpt-messenger-clone-7f191.firebaseapp.com",
  projectId: "chatgpt-messenger-clone-7f191",
  storageBucket: "chatgpt-messenger-clone-7f191.appspot.com",
  messagingSenderId: "402641538914",
  appId: "1:402641538914:web:5c83ece15df32b74e6a63b",
  measurementId: "G-NLT3779ZPK"
};

// Initialize Firebase
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);