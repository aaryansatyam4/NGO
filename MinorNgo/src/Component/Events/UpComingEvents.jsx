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
    {
      id: 3,
      title: 'Charity Run for Education',
      date: 'November 1, 2024',
      location: 'Central Park, New York',
      time: '7:00 AM - 11:00 AM',
      objectives: 'Raise awareness and funds for children\'s education in underprivileged areas.',
    },
    {
      id: 4,
      title: 'Winter Clothing Drive',
      date: 'December 15, 2024',
      location: 'Downtown Mall, San Francisco',
      time: '11:00 AM - 4:00 PM',
      objectives: 'Collect winter clothing to distribute to the homeless and low-income families.',
    },
    {
      id: 5,
      title: 'Blood Donation Camp',
      date: 'January 10, 2025',
      location: 'Community Health Center, Chicago',
      time: '9:00 AM - 2:00 PM',
      objectives: 'Encourage blood donation to help save lives in local hospitals.',
    },
  ];

  const handleShow = (event) => {
    setSelectedEvent(event);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Upcoming Events</h2>

      {/* Scrollable Card for Upcoming Events */}
      <Card className="shadow p-4">
        <Card.Body style={{ maxHeight: '400px', overflowY: 'scroll' }}>
          <div className="list-group">
            {events.map((event) => (
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

      {/* Modal to show upcoming event details */}
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
