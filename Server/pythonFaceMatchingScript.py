import sys
import face_recognition

def match_face(image_path):
    # Load the uploaded image
    uploaded_image = face_recognition.load_image_file(image_path)

    # Find all the known images and compare
    known_images = [face_recognition.load_image_file('folder_with_known_images/' + img) for img in os.listdir('folder_with_known_images')]
    known_encodings = [face_recognition.face_encodings(img)[0] for img in known_images if len(face_recognition.face_encodings(img)) > 0]

    uploaded_encoding = face_recognition.face_encodings(uploaded_image)
    if uploaded_encoding:
        results = face_recognition.compare_faces(known_encodings, uploaded_encoding[0])
        if any(results):
            print("match")  # Match found
            sys.exit(0)
        else:
            print("no match")  # No match found
            sys.exit(1)
    else:
        print("encoding error")  # Error in encoding
        sys.exit(1)

if __name__ == "__main__":
    match_face(sys.argv[1])
 