from db.fire_core import firebase


class AuthStore:
    def __init__(self):
        self.auth = firebase.auth()
        # {"userId:" "", "idToken:" ""}
        self.id_token_holder = None

    async def exchange_refresh_for_id_token(self, refresh_token):
        try:
            id_token = self.auth.refresh(refresh_token)
            self.id_token_holder = id_token
            print("ID token exchanged:", self.id_token_holder)
            return id_token
        except Exception as error:
            print("Error exchanging refresh token for ID token:", error)
            return None

    async def sign_in_with_email_and_password(self, email, password):
        try:
            user = self.auth.sign_in_with_email_and_password(email, password)
            print("User signed in:", user)
            return user
        except Exception as error:
            print("Error signing in:", error)
            return None

    async def sign_in_anonymous(self):
        try:
            user = self.auth.sign_in_anonymous()
            print("Anonymous user signed in:", user)
            return user
        except Exception as error:
            print("Error signing in anonymously:", error)
            return None

    async def update_profile(
        self, user_token, display_name=None, photo_url=None, delete_attribute=None
    ):
        try:
            user = self.auth.update_profile(
                user_token, display_name, photo_url, delete_attribute
            )
            print("User profile updated:", user)
            return user
        except Exception as error:
            print("Error updating profile:", error)
            return None

    async def get_account_info(self, user_token):
        try:
            user_info = self.auth.get_account_info(user_token)
            print("User account info:", user_info)
            return user_info
        except Exception as error:
            print("Error getting account info:", error)
            return None

    async def create_user_with_email_and_password(self, email, password):
        try:
            user = self.auth.create_user_with_email_and_password(email, password)
            print("User created:", user)
            return user
        except Exception as error:
            print("Error creating user:", error)
            return None

    async def send_email_verification(self, user_token):
        try:
            self.auth.send_email_verification(user_token)
            print("Email verification sent")
        except Exception as error:
            print("Error sending email verification:", error)

    async def send_password_reset_email(self, email):
        try:
            self.auth.send_password_reset_email(email)
            print("Password reset email sent")
        except Exception as error:
            print("Error sending password reset email:", error)

    async def refresh_token(self, refresh_token):
        try:
            user = self.auth.refresh(refresh_token)
            print("Token refreshed:", user)
            return user
        except Exception as error:
            print("Error refreshing token:", error)
            return None

    async def delete_user_account(self, user_token):
        try:
            self.auth.delete_user_account(user_token)
            print("User account deleted")
        except Exception as error:
            print("Error deleting user account:", error)

    async def create_custom_token(self, custom_id, additional_claims=None):
        try:
            if additional_claims:
                token = self.auth.create_custom_token(custom_id, additional_claims)
            else:
                token = self.auth.create_custom_token(custom_id)
            print("Custom token created:", token)
            return token
        except Exception as error:
            print("Error creating custom token:", error)
            return None

    async def sign_in_with_custom_token(self, token):
        try:
            user = self.auth.sign_in_with_custom_token(token)
            print("User signed in with custom token:", user)
            return user
        except Exception as error:
            print("Error signing in with custom token:", error)
            return None


# Usage
auth_store = AuthStore()
