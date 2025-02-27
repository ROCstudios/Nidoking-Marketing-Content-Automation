class UserStore {
  constructor() {
    if (!UserStore.instance) {
      this.userData = null;
      UserStore.instance = this;
    }
    return UserStore.instance;
  }

  async fetchUserData() {
    try {
      const user = await firebase.auth().currentUser;
      if (user) {
        this.userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
      } else {
        throw new Error("No user is currently logged in.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      this.userData = null;
    }
  }

  getUserData() {
    return this.userData;
  }
}

const instance = new UserStore();
Object.freeze(instance);

export default instance;
