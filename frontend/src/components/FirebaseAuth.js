import React, { useEffect } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import * as firebaseui from "firebaseui";
import { auth } from "../data/firebaseConfig";

var ui = new firebaseui.auth.AuthUI(auth);

const FirebaseAuth = () => {
  ui.start("#firebaseui-auth-container", {
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false,
      },
    ],
  });

  return <div id="firebaseui-auth-container"></div>;
};

export default FirebaseAuth;
