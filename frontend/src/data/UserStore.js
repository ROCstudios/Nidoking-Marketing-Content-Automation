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
}

const instance = new UserStore();

export default instance;
