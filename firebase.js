// firebase-config.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBS7tyLbP6ljA1WFDRXbez189aRf9nWWgw",
  authDomain: "devfest-32d78.firebaseapp.com",
  projectId: "devfest-32d78",
  storageBucket: "devfest-32d78.appspot.com",
  messagingSenderId: "724324993217",
  appId: "1:724324993217:web:29e5499fc34bd6f012ec40",
  measurementId: "G-T62HX7798B",
};

let messaging = null;
if (typeof window !== "undefined" && "Notification" in window) {
  const app = initializeApp(firebaseConfig);
  messaging = getMessaging(app);
}

export { messaging, getToken };
