// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDizRB3IPW2dZzm00zXcOlXPhq6WnbwGOA",
  authDomain: "webapp-5a8eb.firebaseapp.com",
  projectId: "webapp-5a8eb",
  storageBucket: "webapp-5a8eb.firebasestorage.app",
  messagingSenderId: "556598264182",
  appId: "1:556598264182:web:5400bab6625596bab9fa57"
};
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export { messaging, onMessage };
