// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDg8GCpZUsg0RiUJdcLsS-C1XPaBp0MaZI",
  authDomain: "ktvisa-3ac7f.firebaseapp.com",
  projectId: "ktvisa-3ac7f",
  storageBucket: "ktvisa-3ac7f.firebasestorage.app",
  messagingSenderId: "1069684648681",
  appId: "1:1069684648681:web:b010d1e3b499a929cc9e78",
  measurementId: "G-NSVWPBLJT7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics only on client side
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics };
export default app;
