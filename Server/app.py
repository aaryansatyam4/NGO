from PIL import Image
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import face_recognition
import os
from pythonFaceMatchingScript import compare_single_image_to_folder

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

def load_images_from_folder(folder):
    """Load all valid images from a specified folder and convert them to RGB."""
    images = []
    for filename in os.listdir(folder):
        if filename.endswith(('png', 'jpg', 'jpeg')):
            img_path = os.path.join(folder, filename)
            try:
                img = Image.open(img_path).convert("RGB")  # convert image to RGB
                img = np.array(img)
                images.append((filename, img))
            except Exception as e:
                print(f"Error loading {img_path}: {e}")
    return images

@app.route('/match-face', methods=['POST'])
def match_face():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    image_file = request.files['image']
    try:
        # Convert uploaded image to RGB format
        uploaded_image = Image.open(image_file).convert("RGB")
        uploaded_image = np.array(uploaded_image)
    except Exception as e:
        return jsonify({"error": f"Error loading uploaded image: {str(e)}"}), 400

    folder_path = './images'
    
    # Ensure folder exists and has images
    if not os.path.exists(folder_path) or not os.listdir(folder_path):
        return jsonify({"error": "Folder not found or no images in folder"}), 500

    matching_results = compare_single_image_to_folder(uploaded_image, folder_path)

    if "error" in matching_results:
        return jsonify(matching_results), 400

    return jsonify({"matches": matching_results})

if __name__ == "__main__":
    app.run(debug=True)
