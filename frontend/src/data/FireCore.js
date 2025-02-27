import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyADudOoSNeTRFvoT98xeYGHhzsbSpRnqE0",
  authDomain: "test-nidoking-marketing.firebaseapp.com",
  projectId: "test-nidoking-marketing",
  storageBucket: "test-nidoking-marketing.firebasestorage.app",
  messagingSenderId: "575940079994",
  appId: "1:575940079994:web:2ae9e2ea3b85ee694326c3",
  measurementId: "G-LZHK7QVJZT",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
