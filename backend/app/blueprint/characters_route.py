from flask import Blueprint, jsonify, request
import requests

# Create a blueprint for the characters endpoint
characters_bp = Blueprint("characters", __name__)


@characters_bp.route("/", methods=["GET"])
def get_characters():
    # Optional query parameters for pagination
    page = request.args.get("page", 1)
    page_size = request.args.get("page_size", 10)

    # RenderNet Characters endpoint as per documentation
    api_url = "https://api.rendernet.ai/pub/v1/characters"
    headers = {"X-API-KEY": "8yb3-iTJ3M4oHTtaCz1yDY6zEwNj-QQZzfBD8FJRPQc"}
    params = {"page": page, "page_size": page_size}

    try:
        response = requests.get(api_url, headers=headers, params=params)
        response.raise_for_status()  # Raise an exception for HTTP errors
    except requests.RequestException as e:
        return jsonify({"error": "Failed to fetch characters", "details": str(e)}), 500

    result = response.json()

    # Extract the list of characters and create a clean list with selected fields
    characters = result.get("data", [])
    clean_characters = [
        {
            "id": char.get("id"),
            "name": char.get("name"),
            "prompt": char.get("prompt"),
            "character_type": char.get("character_type"),
            "system_character": char.get("system_character"),
        }
        for char in characters
    ]

    return jsonify(clean_characters)
