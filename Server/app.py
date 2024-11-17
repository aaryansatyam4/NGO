import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np
import face_recognition
import io

app = Flask(__name__)
CORS(app)  # Enable CORS for all domains

# Path to the folder containing dataset images
DATASET_FOLDER = "datasetImages"

# Dictionary to store face encodings and their corresponding filenames
known_faces = {}

def load_dataset():
    """Load and encode all images in the dataset folder."""
    global known_faces
    known_faces = {}
    
    for filename in os.listdir(DATASET_FOLDER):
        filepath = os.path.join(DATASET_FOLDER, filename)
        
        # Ensure it's an image file
        if filename.lower().endswith(('png', 'jpg', 'jpeg')):
            try:
                img = face_recognition.load_image_file(filepath)
                encodings = face_recognition.face_encodings(img)
                
                if encodings:  # If a face encoding is found
                    known_faces[filename] = encodings[0]  # Use the first encoding
                    print(f"Loaded encoding for {filename}")
                else:
                    print(f"No face found in {filename}")
            except Exception as e:
                print(f"Error processing {filename}: {e}")

def decode_image(file):
    """Decode uploaded image file to a numpy array."""
    try:
        img = Image.open(file)
        img = img.convert("RGB")  # Convert to RGB format
        img_array = np.array(img)
        return img_array
    except Exception as e:
        print(f"Error decoding image: {e}")
        return None

def compare_with_dataset(image_array):
    """Compare the uploaded image with the dataset."""
    try:
        # Find face encodings in the uploaded image
        uploaded_face_encodings = face_recognition.face_encodings(image_array)
        if len(uploaded_face_encodings) == 0:
            return {"error": "No faces found in the image"}
        
        uploaded_encoding = uploaded_face_encodings[0]
        match_results = []
        
        # Compare with all known faces
        for filename, known_encoding in known_faces.items():
            match = face_recognition.compare_faces([known_encoding], uploaded_encoding)[0]
            distance = face_recognition.face_distance([known_encoding], uploaded_encoding)[0]
            match_results.append({"filename": filename, "match": match, "distance": distance})
        
        # Sort results by distance (lower is better)
        match_results.sort(key=lambda x: x["distance"])
        
        # Return the best match or no match if all distances are too high
        best_match = match_results[0] if match_results else None
        if best_match and best_match["match"]:
            return {"message": "Face matched", "matched_file": best_match["filename"], "distance": best_match["distance"]}
        else:
            return {"message": "No match found"}
    except Exception as e:
        print(f"Error in compare_with_dataset: {e}")
        return {"error": "Error processing the image"}

@app.route('/faceMatch', methods=['POST'])
def match_face():
    """Endpoint to receive the image and process it."""
    try:
        if 'image' not in request.files:
            return jsonify({"error": "No image file provided"}), 400
        
        # Get the uploaded image
        file = request.files['image']
        image_array = decode_image(file)
        if image_array is None:
            return jsonify({"error": "Invalid image format"}), 400
        
        # Compare the image with the dataset
        result = compare_with_dataset(image_array)
        return jsonify(result)

    except Exception as e:
        print(f"Error in match_face endpoint: {e}")
        return jsonify({"error": "Server error"}), 500

if __name__ == '__main__':
    print("Loading dataset...")
    load_dataset()  # Load dataset encodings at startup
    app.run(debug=True)
