
import { initializeApp } from "firebase/app";
import{getAuth} from "firebase/auth";
import { getStorage,  } from "firebase/storage";
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAmUKBUpFO5bPFH6lmW13B4wVatTr3WmxI",
  authDomain: "chat-app-57a26.firebaseapp.com",
  projectId: "chat-app-57a26",
  storageBucket: "chat-app-57a26.appspot.com",
  messagingSenderId: "325101310504",
  appId: "1:325101310504:web:b249a4877e7258cfe81b1d"
};


export const app = initializeApp(firebaseConfig);
export const auth= getAuth();
export const storage = getStorage();
export const db = getFirestore()
