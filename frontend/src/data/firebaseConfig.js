import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADudOoSNeTRFvoT98xeYGHhzsbSpRnqE0",
  authDomain: "test-nidoking-marketing.firebaseapp.com",
  projectId: "test-nidoking-marketing",
  storageBucket: "test-nidoking-marketing.firebasestorage.app",
  messagingSenderId: "575940079994",
  appId: "1:575940079994:web:2ae9e2ea3b85ee694326c3",
  measurementId: "G-LZHK7QVJZT",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();

export { auth };
