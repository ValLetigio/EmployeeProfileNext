import { initializeApp } from "firebase/app"; 

import { getStorage } from "firebase/storage"; 

import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyDo-tNJqT5nn5oJZHKF9T7gVcNklqf90n0",
  authDomain: "pustananemployeeprofile.firebaseapp.com",
  projectId: "pustananemployeeprofile",
  storageBucket: "pustananemployeeprofile.firebasestorage.app",
  messagingSenderId: "18205583125",
  appId: "1:18205583125:web:f75cc50d73203d10632b1c"
}; 


const app = initializeApp(firebaseConfig); 

const storage = getStorage(app); 

const db = getFirestore(app);

export { firebaseConfig, app, storage, db };