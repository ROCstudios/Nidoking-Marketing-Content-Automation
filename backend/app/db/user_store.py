import firebase_admin
from firebase_admin import credentials, firestore


class UserStore:
    def __init__(self):
        # Initialize Firebase Admin SDK
        cred = credentials.ApplicationDefault()
        firebase_admin.initialize_app(cred)
        self.db = firestore.client()

    async def fetch_user(self, email):
        try:
            user_ref = self.db.collection("users").document(email)
            doc = await user_ref.get()
            if doc.exists:
                return doc.to_dict()
            else:
                print("No such user!")
                return None
        except Exception as error:
            print("Error fetching user:", error)

    async def save_user(self, user_data):
        try:
            user_ref = self.db.collection("users").document(user_data["email"])
            await user_ref.set(user_data, merge=True)
            print("User saved to collection:", user_data)
        except Exception as error:
            print("Error saving user to collection:", error)

    async def fetch_brand(self, email):
        try:
            user_ref = self.db.collection("users").document(email)
            doc = await user_ref.get()
            if doc.exists:
                return doc.to_dict()["brand"]
            else:
                print("No such brand!")
                return None
        except Exception as error:
            print("Error fetching brand:", error)

    async def save_brand(self, email, brand):
        try:
            user_ref = self.db.collection("users").document(email)
            await user_ref.set({"brand": brand}, merge=True)
            print("Brand saved to user:", brand)
        except Exception as error:
            print("Error saving brand to user:", error)
