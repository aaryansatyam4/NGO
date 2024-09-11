import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpComingEvents = () => {
  const [show, setShow] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Sample upcoming events data
  const events = [
    {
      id: 1,
      title: 'Community Clean-Up Drive',
      date: 'September 20, 2024',
      location: 'City Park, New York',
      time: '10:00 AM - 2:00 PM',
      objectives: 'Help clean up the park and raise awareness for environmental sustainability.',
    },
    {
      id: 2,
      title: 'Food Donation Drive',
      date: 'October 5, 2024',
      location: 'Downtown Community Center, Chicago',
      time: '9:00 AM - 5:00 PM',
      objectives: 'Distribute food to those in need and raise donations for the local food bank.',
    },
    // Add more events as needed
  ];

  const handleShow = (event) => {
    setSelectedEvent(event);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Upcoming Events</h2>
      <div className="row">
        {events.map((event) => (
          <div className="col-md-4 mb-4" key={event.id}>
            <Card className="shadow">
              <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Text>
                  <strong>Date:</strong> {event.date}
                </Card.Text>
                <Button variant="primary" onClick={() => handleShow(event)}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Modal to show event details */}
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

export default UpComingEvents;
