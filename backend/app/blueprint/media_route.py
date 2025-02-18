from flask import Blueprint, request, jsonify
from ai_gen import generate_image
import os

script_dir = os.path.dirname(os.path.abspath(__file__))

media_bp = Blueprint("media", __name__)


@media_bp.route("/image", methods=["POST"])
def get_image():
    try:
        data = request.get_json()
        # TODO: Add actual image generation logic here
        # For now return mock response
        response = {
            "image_url": "https://example.com/image.jpg",
        }
        return jsonify(response), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400
