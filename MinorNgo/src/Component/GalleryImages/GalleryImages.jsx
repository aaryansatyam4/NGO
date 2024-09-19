import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const GalleryImages = () => {
  const [images] = useState([
    'https://picsum.photos/id/237/200/300?random=1',
    'https://picsum.photos/200/300?random=2',
    'https://picsum.photos/200/300?random=3',
    'https://picsum.photos/200/300?random=4',
    'https://picsum.photos/200/300?random=5',
    'https://picsum.photos/200/300?random=6',
    'https://picsum.photos/200/300?random=7',
    'https://picsum.photos/200/300?random=8',
    'https://picsum.photos/id/237/200/300?random=9',
    'https://picsum.photos/200/300?random=10',
    'https://picsum.photos/200/300?random=11',
    'https://picsum.photos/200/300?random=12',
    'https://picsum.photos/200/300?random=13',
    'https://picsum.photos/200/300?random=14',
    'https://picsum.photos/200/300?random=15',
    'https://picsum.photos/200/300?random=16'
  ]);

  const [selectedImage, setSelectedImage] = useState(null); // To store the selected image
  const [showModal, setShowModal] = useState(false); // For controlling the modal

  // Handle image click to open modal
  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setShowModal(true);
  };

  // Close the modal
  const handleClose = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">OUR WORK</h1>
      <div className="row g-3">
        {images.map((imageSrc, index) => (
          <div className="col-md-3 col-sm-6" key={index}>
            <img
              className="img-fluid"
              src={imageSrc}
              alt={`Random ${index + 1}`}
              style={{ cursor: 'pointer' }}
              onClick={() => handleImageClick(imageSrc)} // Open modal on click
            />
          </div>
        ))}
      </div>

      {/* Modal for image enlargement */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {selectedImage && <img src={selectedImage} alt="Enlarged" className="img-fluid" />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GalleryImages;
