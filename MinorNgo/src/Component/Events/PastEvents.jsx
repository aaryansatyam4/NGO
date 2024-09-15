import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PastEvents = () => {
  const [show, setShow] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Sample past events data
  const pastEvents = [
    {
      id: 1,
      title: 'Tree Plantation Drive',
      date: 'June 12, 2024',
      location: 'Central Park, Los Angeles',
      time: '10:00 AM - 3:00 PM',
      objectives: 'Planted 500 trees and spread awareness about the importance of trees.',
    },
    {
      id: 2,
      title: 'Blood Donation Camp',
      date: 'May 20, 2024',
      location: 'City Hospital, Chicago',
      time: '9:00 AM - 4:00 PM',
      objectives: 'Collected over 200 blood donations to help local hospitals.',
    },
    // Add more past events as needed
  ];

  const handleShow = (event) => {
    setSelectedEvent(event);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Past Events</h2>

      {/* Scrollable Card for Past Events */}
      <Card className="shadow p-4">
        <Card.Body style={{ maxHeight: '400px', overflowY: 'scroll' }}>
          <div className="list-group">
            {pastEvents.map((event) => (
              <Button
                key={event.id}
                variant="light"
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center mb-2"
                onClick={() => handleShow(event)}
              >
                <div>
                  <strong>ID:</strong> {event.id}
                </div>
                <div>
                  <strong>Event Name:</strong> {event.title}
                </div>
                <div>
                  <strong>Date:</strong> {event.date}
                </div>
              </Button>
            ))}
          </div>
        </Card.Body>
      </Card>

      {/* Modal to show past event details */}
      {selectedEvent && (
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedEvent.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Date:</strong> {selectedEvent.date}</p>
            <p><strong>Location:</strong> {selectedEvent.location}</p>
            <p><strong>Time:</strong> {selectedEvent.time}</p>
            <p><strong>Objectives:</strong> {selectedEvent.objectives}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default PastEvents;
