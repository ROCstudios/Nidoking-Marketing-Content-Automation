from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import firebase_admin
from firebase_admin import credentials

script_dir = os.path.dirname(os.path.abspath(__file__))

cred = credentials.ApplicationDefault()
firebase_admin.initialize_app(cred)

app = Flask(__name__)
CORS(
    app,
    resources={
        r"/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS", "PUT", "DELETE"]}
    },
)


def create_app():
    from blueprint.user_route import user_blueprint
    from blueprint.content_route import content_bp
    from blueprint.media_route import media_bp

    app.register_blueprint(content_bp, url_prefix="/content")
    app.register_blueprint(media_bp, url_prefix="/media")
    app.register_blueprint(user_blueprint, url_prefix="/user")
    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, host="0.0.0.0", port=5001)
