from flask import Blueprint, request, jsonify
from ai.content_gen import generate_text_bundle
from ai.movie_gen import generate_movie_bundle
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
    render_id = data.get("render_id")
    voice_id = data.get("voice_id")
    prompt = data.get("prompt")

    text_bundle = await generate_text_bundle(email, title, topic)
    movie_bundle = await generate_movie_bundle(
        render_id, voice_id, text_bundle["movie_script"], prompt
    )

    if text_bundle and movie_bundle:
        return (
            jsonify(
                {
                    "text_bundle": text_bundle,
                    "movie_bundle": movie_bundle,
                }
            ),
        )
        201
    else:
        return jsonify({"error": "Failed to generate text bundle"}), 400
    # except Exception as e:
    #     return jsonify({"error": str(e)}), 400
