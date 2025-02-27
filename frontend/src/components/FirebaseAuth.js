import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import * as firebaseui from "firebaseui";
import { auth } from "../data/firebaseConfig";

var ui = new firebaseui.auth.AuthUI(auth);
const FirebaseAuth = () => {
  const navigate = useNavigate();
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return navigate("/convo");
      },
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: "popup",
    signInSuccessUrl: "/",
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    // Terms of service url.
    tosUrl: "<your-tos-url>",
    // Privacy policy url.
    privacyPolicyUrl: "<your-privacy-policy-url>",
  };
  ui.start("#firebaseui-auth-container", uiConfig);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-base-200 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Firebase Authentication</h1>
      <div id="firebaseui-auth-container" className="w-full max-w-md"></div>
    </div>
  );
};

export default FirebaseAuth;
