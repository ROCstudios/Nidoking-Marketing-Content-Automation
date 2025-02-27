import firebase_admin
from firebase_admin import firestore

# Application Default credentials are automatically created.
app = firebase_admin.initialize_app()
db = firestore.client()


def add_user(user_id, user_data):
    db.collection("users").document(user_id).set(user_data)


def get_user(user_id):
    return db.collection("users").document(user_id).get().to_dict()


def add_post(user_id, post_id, post_data):
    db.collection("users").document(user_id).collection("posts").document(post_id).set(
        post_data
    )


def get_post(user_id, post_id):
    return (
        db.collection("users")
        .document(user_id)
        .collection("posts")
        .document(post_id)
        .get()
        .to_dict()
    )
