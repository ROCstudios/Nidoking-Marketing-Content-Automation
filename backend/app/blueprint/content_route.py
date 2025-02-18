from flask import Blueprint, request, jsonify
from ai_gen import generate_seo_blog_post
import os

script_dir = os.path.dirname(os.path.abspath(__file__))

content_bp = Blueprint("content", __name__)


@content_bp.route("/seo", methods=["POST"])
def get_seo_post():
    try:
        data = request.get_json()
        avatar = data.get("avatar")
        pain_points = data.get("pain_points")
        solutions = data.get("solutions")
        brand_voice = data.get("brand_voice")

        response = generate_seo_blog_post(avatar, pain_points, solutions, brand_voice)

        return jsonify({"content": response}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@content_bp.route("/tweet", methods=["POST"])
def get_tweets():
    try:
        data = request.get_json()
        # TODO: Add actual tweet generation logic here
        # For now return mock response
        response = {
            "content": "This is a sample tweet content within 280 characters!",
            "hashtags": ["#tweet", "#sample"],
            "char_count": 58,
        }
        return jsonify(response), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400
