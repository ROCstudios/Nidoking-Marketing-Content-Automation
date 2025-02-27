from flask import Blueprint, request, jsonify
from backend.app.db.user_store import UserStore

user_blueprint = Blueprint("user", __name__)
user_store = UserStore()


@user_blueprint.route("/user/<email>", methods=["GET"])
async def get_user(email):
    user_data = await user_store.fetch_user(email)
    if user_data:
        return jsonify(user_data), 200
    else:
        return jsonify({"error": "User not found"}), 404


@user_blueprint.route("/user", methods=["POST"])
async def save_user():
    user_data = request.json
    if not user_data or "email" not in user_data:
        return jsonify({"error": "Invalid user data"}), 400

    await user_store.save_user(user_data)
    return jsonify({"message": "User saved successfully"}), 201
