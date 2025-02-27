import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../config";
import ErrorAlert from "../common/ErrorAlert";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Configure Firebase.
const firebaseConfig = {
  apiKey: "AIzaSyADudOoSNeTRFvoT98xeYGHhzsbSpRnqE0",
  authDomain: "test-nidoking-marketing.firebaseapp.com",
  projectId: "test-nidoking-marketing",
  storageBucket: "test-nidoking-marketing.firebasestorage.app",
  messagingSenderId: "575940079994",
  appId: "1:575940079994:web:2ae9e2ea3b85ee694326c3",
  measurementId: "G-LZHK7QVJZT",
};

firebase.initializeApp(firebaseConfig);

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
};

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [widget, setWidget] = useState(null);

  useEffect(() => {
    setWidget(
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    );
  }, []);

  const handleLogin = async () => {
    // TODO We need to have seperate conditional logic for the Instagram token logic.
    // Instagram can be automated but we'll need  a more explicit approach since TikTok expires quickly
    // Research their docs.

    const response = await axios.get(`${config.backendUrl}/tiktokauth`);
    const authUrl = response.data.url;
    if (response.status === 200) {
      window.location.href = authUrl;
    } else {
      setError("Failed to get authentication URL");
    }
  };

  return (
    <div>
      {error && <ErrorAlert message={error} />}
      {widget}
    </div>
  );
};

export default Login;
