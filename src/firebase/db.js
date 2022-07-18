// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9pQfnW7VhKRUqGKQ8M9VNEwPUySP3E28",
  authDomain: "vue-auth-331ca.firebaseapp.com",
  projectId: "vue-auth-331ca",
  storageBucket: "vue-auth-331ca.appspot.com",
  messagingSenderId: "1053636864135",
  appId: "1:1053636864135:web:74c71644810d37272b3022",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
