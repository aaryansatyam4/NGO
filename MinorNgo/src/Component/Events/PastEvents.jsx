import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PastEvents = () => {
  const [show, setShow] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch past events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3001/events', {
          withCredentials: true,
        });

        // Filter events to include only approved and past events
        const currentDate = new Date();
        const pastEvents = response.data.filter(event => 
          event.approved === true && new Date(event.date) < currentDate
        );

        setEvents(pastEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
        setErrorMessage('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleShow = (event) => {
    setSelectedEvent(event);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Past Events</h2>
      
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      
      {loading ? (
        <div className="text-center">Loading events...</div>
      ) : (
        <Card className="shadow p-4">
          <Card.Body style={{ maxHeight: '400px', overflowY: 'scroll' }}>
            <div className="list-group">
              {events.length > 0 ? (
                events.map((event) => (
                  <Button
                    key={event._id}
                    variant="light"
                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center mb-2"
                    onClick={() => handleShow(event)}
                  >
                    <div>
                      <strong>ID:</strong> {event._id}
                    </div>
                    <div>
                      <strong>Event Name:</strong> {event.title}
                    </div>
                    <div>
                      <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                    </div>
                  </Button>
                ))
              ) : (
                <div className="text-center">No past events</div>
              )}
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Modal to show past event details */}
      {selectedEvent && (
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedEvent.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString()}</p>
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
