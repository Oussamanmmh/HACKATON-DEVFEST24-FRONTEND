// public/firebase-messaging-sw.js
import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

const firebaseConfig = {
  apiKey: "AIzaSyBS7tyLbP6ljA1WFDRXbez189aRf9nWWgw",
  authDomain: "devfest-32d78.firebaseapp.com",
  projectId: "devfest-32d78",
  storageBucket: "devfest-32d78.appspot.com",
  messagingSenderId: "724324993217",
  appId: "1:724324993217:web:29e5499fc34bd6f012ec40",
  measurementId: "G-T62HX7798B",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Handle background messages
onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
