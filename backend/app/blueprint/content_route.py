from flask import Blueprint, request, jsonify
from ai.content_gen import generate_text_bundle
import os

script_dir = os.path.dirname(os.path.abspath(__file__))

content_bp = Blueprint("content", __name__)


@content_bp.route("/text", methods=["POST"])
async def create_text_bundle():
    # try:
    data = request.get_json()
    email = data.get("email")
    title = data.get("title")
    topic = data.get("topic")
    response = await generate_text_bundle(email, title, topic)
    if response:
        return jsonify(response), 201
    else:
        return jsonify({"error": "Failed to generate text bundle"}), 400
    # except Exception as e:
    #     return jsonify({"error": str(e)}), 400
