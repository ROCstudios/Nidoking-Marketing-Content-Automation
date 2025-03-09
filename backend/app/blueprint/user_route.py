from flask import Blueprint, request, jsonify
from db.user_store import UserStore
from db.bundle_store import BundleStore

user_store = UserStore()
bundle_store = BundleStore()

user_blueprint = Blueprint("user", __name__)


@user_blueprint.route("/<email>", methods=["GET"])
async def get_user(email):
    user_data = await user_store.fetch_user(email)
    if user_data:
        return jsonify(user_data), 200
    else:
        return jsonify({"error": "User not found"}), 404


@user_blueprint.route("/save", methods=["POST"])
async def save_user():
    user_data = request.json
    if not user_data or "email" not in user_data:
        return jsonify({"error": "Invalid user data"}), 400

    await user_store.save_user(user_data)
    return jsonify({"message": "User saved successfully"}), 201


@user_blueprint.route("/bundles", methods=["GET"])
async def get_user_bundles():
    email = request.args.get("email")
    bundles = await bundle_store.fetch_all_bundles(email)
    return jsonify(bundles), 200


@user_blueprint.route("/bundles", methods=["POST"])
async def save_user_bundle():
    email = request.args.get("email")
    bundle = request.json
    await bundle_store.save_bundle(email, bundle)
    return jsonify({"message": "Bundle saved successfully"}), 201


@user_blueprint.route("/brand", methods=["GET"])
async def get_user_brand():
    email = request.args.get("email")
    brand = await user_store.fetch_brand(email)
    return jsonify(brand), 200


@user_blueprint.route("/brand", methods=["POST"])
async def save_user_brand():
    body = request.json
    email = body.get("email")
    brand = body.get("brand")
    await user_store.save_brand(email, brand)
    return jsonify({"message": "Brand saved successfully"}), 201
