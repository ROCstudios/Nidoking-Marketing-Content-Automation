from db.fire_core import fire_data


class UserStore:

    async def fetch_user(self, email):
        try:
            document = fire_data.document(f"users/{email}")
            if document.exists:
                return document.to_dict()
            else:
                print("No such user!")
                return None
        except Exception as error:
            print("Error fetching user:", error)

    async def save_user(self, user_data):

        try:
            fire_data.create_document(
                f"users/{user_data['email']}",
                {
                    "email": user_data["email"],
                },
            )
            print("User saved to collection")
        except Exception as error:
            print("Error saving user to collection:", error)

    async def fetch_brand(self, email):
        try:
            document = fire_data.document(f"users/{email}")
            if document.exists:
                return document.to_dict()["brand"]
            else:
                print("No such brand!")
                return None
        except Exception as error:
            print("Error fetching brand:", error)

    async def save_brand(self, email, brand):
        try:
            fire_data.update_document(
                f"users/{email}",
                {
                    "brand": brand,
                },
            )
            print("Brand saved to user:", brand)
        except Exception as error:
            print("Error saving brand to user:", error)
