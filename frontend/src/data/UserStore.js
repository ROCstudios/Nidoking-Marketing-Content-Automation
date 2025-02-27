import { auth } from "./firebaseConfig";
import firebase from "firebase/compat/app";

class UserStore {
  constructor() {
    if (!UserStore.instance) {
      this.user = null;
      this.init();
      UserStore.instance = this;
    }
    return UserStore.instance;
  }

  init() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.getUserData(user.uid);
      } else {
        this.user = null;
      }
    });
  }

  async getUserData(uid) {
    try {
      const userDoc = await firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        // Store user data locally (e.g., in localStorage or state management)
        console.log("User data retrieved:", userData);
      } else {
        console.log("No such user data!");
      }
    } catch (error) {
      console.error("Error getting user data:", error);
    }
  }

  getCurrentUser() {
    return this.user;
  }

  async saveUserToCollection(user) {
    try {
      const userRef = firebase.firestore().collection("users").doc(user.email);
      const userData = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: user.displayName,
        isAnonymous: user.isAnonymous,
        providerData: user.providerData,
        stsTokenManager: user.stsTokenManager,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt,
      };
      await userRef.set(userData, { merge: true });
      console.log("User saved to collection:", userData);
    } catch (error) {
      console.error("Error saving user to collection:", error);
    }
  }
}

const instance = new UserStore();
Object.freeze(instance);

export default instance;
