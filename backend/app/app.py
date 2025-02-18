from flask import Flask, request, jsonify
from flask_cors import CORS
from blueprint.content_route import content_bp
from blueprint.media_route import media_bp
import os

script_dir = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__)
CORS(app)

app.register_blueprint(content_bp)
app.register_blueprint(media_bp)


@app.route("/api/data", methods=["GET"])
def get_data():
    try:
        # Sample response - replace with actual data handling
        data = {
            "message": "Data retrieved successfully",
            "data": ["item1", "item2", "item3"],
        }
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/submit", methods=["POST"])
def submit_data():
    try:
        data = request.get_json()
        # Process the received data here
        # For now, just echo back the received data
        response = {"message": "Data received successfully", "received_data": data}
        return jsonify(response), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)
