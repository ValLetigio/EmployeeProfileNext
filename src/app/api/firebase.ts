import { initializeApp } from "firebase/app"; 

import { getStorage } from "firebase/storage"; 

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDo-tNJqT5nn5oJZHKF9T7gVcNklqf90n0",
  authDomain: "pustananemployeeprofile.firebaseapp.com",
  projectId: "pustananemployeeprofile",
  storageBucket: "pustananemployeeprofile.appspot.com",
  messagingSenderId: "18205583125",
  appId: "1:18205583125:web:f75cc50d73203d10632b1c"
}; 

// const firebaseConfig = {
//   apiKey: "AIzaSyC-xGulN76TiL_QRstmbysESLQ8kZg46eA",
//   authDomain: "employee-records-app.firebaseapp.com",
//   projectId: "employee-records-app",
//   storageBucket: "employee-records-app.firebasestorage.app",
//   messagingSenderId: "996478821392",
//   appId: "1:996478821392:web:ec9da5bcf8cf67d6199695",
//   measurementId: "G-WZFVSLSS99", 
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyDnFzbjAZ7CMdPD9DQs-JR-PquCSxdAoYk",
//   authDomain: "chat-app-84014.firebaseapp.com",
//   projectId: "chat-app-84014",
//   storageBucket: "chat-app-84014.firebasestorage.app",
//   messagingSenderId: "917247631172",
//   appId: "1:917247631172:web:8624f5fb3e8ece86640111"
// };


const app = initializeApp(firebaseConfig); 

const storage = getStorage(app); 

const db = getFirestore(app);

export { firebaseConfig, app, storage, db };