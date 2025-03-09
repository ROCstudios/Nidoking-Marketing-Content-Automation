from flask import Blueprint, request, jsonify
from db.auth_store import auth_store

auth_blueprint = Blueprint("auth", __name__)


@auth_blueprint.route("/token_register", methods=["POST"])
async def token_register():
    refresh_token = request.json.get("refresh_token")
    await auth_store.exchange_refresh_for_id_token(refresh_token)
    return jsonify({"message": "User registered successfully"}), 201


@auth_blueprint.route("/login", methods=["POST"])
async def login_user():
    email = request.json.get("email")
    password = request.json.get("password")
    await auth_store.sign_in_with_email_and_password(email, password)
    return jsonify({"message": "User logged in successfully"}), 200


@auth_blueprint.route("/forgot-password", methods=["POST"])
async def forgot_password():
    email = request.json.get("email")
    await auth_store.send_password_reset_email(email)
    return jsonify({"message": "Password reset email sent"}), 200


@auth_blueprint.route("/profile", methods=["GET"])
async def get_user_profile():
    user_token = request.headers.get("Authorization")
    print("🚀 ~ user_token:", user_token)
    user_info = await auth_store.get_account_info(user_token)
    print("🚀 ~ user_info:", user_info)
    if user_info:
        return jsonify(user_info), 200
    else:
        return jsonify({"error": "User not found"}), 404
