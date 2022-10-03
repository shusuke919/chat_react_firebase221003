
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDX6EgH7lARRmLS6E9ja1dzRKZHY1MsTKg",
  authDomain: "chat-b215e.firebaseapp.com",
  projectId: "chat-b215e",
  storageBucket: "chat-b215e.appspot.com",
  messagingSenderId: "409854226839",
  appId: "1:409854226839:web:f07437b9934bbd411314d2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();