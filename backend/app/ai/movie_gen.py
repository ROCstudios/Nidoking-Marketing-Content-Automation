from flask import Blueprint, jsonify, request
import requests


async def generate_movie_bundle(render_id, voice_id, script, prompt):
    """
    This endpoint generates media on RenderNet using the provided avatar and voice.

    Expected JSON body (all fields optional, defaults are provided):
      {
         "character_id": "chr_01",                # RenderNet character ID (avatar)
         "character_weight": 0.6,                   # Typically 0.6 - 0.8 for same style
         "character_enable_facelock": true,         # True for hyper-realistic face
         "narrator_video_asset_id": "ast_vidxxxxx",  # Video asset ID for narrator (must be uploaded beforehand)
         "narrator_script": "Thank you for trying Narrator",
         "narrator_voice": "Rachel"                 # Voice ID or name from ElevenLabs voices
      }

    If any field is missing, default values are used.
    """

    # Build the payload for the generation.
    # If certain asset IDs (e.g., for control_net, facelock, segment, true_touch, video_anyone) are not provided,
    # the default placeholder values are used.
    payload = [
        {
            "aspect_ratio": "1:1",
            "batch_size": 1,
            "cfg_scale": 7,
            "character": {
                "character_id": render_id,
                "weight": 0.6,
                "enable_facelock": True,
            },
            "narrator": {
                "video_asset_id": render_id,
                "script": script,
                "voice": voice_id,
            },
            "prompt": {
                "negative": "nsfw, deformed, extra limbs, bad anatomy, deformed pupils, text, worst quality, jpeg artifacts, ugly, duplicate, morbid, mutilated",
                "positive": prompt,
            },
        }
    ]

    headers = {
        "X-API-KEY": "your_rendernet_api_key_here",  # Replace with your RenderNet API key.
        "Content-Type": "application/json",
    }
    generation_url = "https://api.rendernet.ai/pub/v1/generations"

    try:
        gen_response = requests.post(generation_url, json=payload, headers=headers)
        gen_response.raise_for_status()
    except requests.RequestException as e:
        return jsonify({"error": "Failed to generate media", "details": str(e)}), 500

    gen_result = gen_response.json()
    data = gen_result.get("data", {})

    # Extract only the essential information to display the generated video or image.
    response_payload = {
        "generation_id": data.get("generation_id"),
        "credits_remaining": data.get("credits_remaining"),
        "result": data.get("result"),
        "media": data.get("media", []),
    }
    print("🚀 ~ response_payload:", response_payload)

    return jsonify(response_payload)
