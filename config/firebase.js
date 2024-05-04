import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDwj1FisKpR1CpYnD7MoE3QTEbKOMsM5dk",
  authDomain: "it-sysarch32-store-saturinas.firebaseapp.com",
  projectId: "it-sysarch32-store-saturinas",
  storageBucket: "it-sysarch32-store-saturinas.appspot.com",
  messagingSenderId: "150244115568",
  appId: "1:150244115568:web:5fd86892a130f0c534a0b5",
  measurementId: "G-DX6Y4WS463"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
