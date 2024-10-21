import React, { useState, useEffect } from 'react';
import { Card, Table, Pagination, DropdownButton, Dropdown, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const LatestNews = () => {
  const [lostChildrenData, setLostChildrenData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState('childName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [selectedChild, setSelectedChild] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Fetch lost children data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/all-lost-children');
        const data = await response.json();
        setLostChildrenData(Array.isArray(data) ? data : []); 
      } catch (error) {
        console.error('Error fetching lost children data:', error);
        setLostChildrenData([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (child) => {
    console.log("Selected child for modal:", child); // Debug log to check the selected child object
    setSelectedChild(child);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedChild(null);
  };

  const handleShowConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleCloseCase = async () => {
    if (!selectedChild || !selectedChild._id) {
      console.error('No selected child or invalid ID');
      return;
    }

    console.log("Closing case for child ID:", selectedChild._id); // Log to check the ID before sending the request

    try {
      const response = await fetch(`http://localhost:3001/close-case/${selectedChild._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ founded: true }),
      });

      if (response.ok) {
        const updatedChild = await response.json();
        console.log('Case closed successfully:', updatedChild);

        // Update the UI
        const updatedChildren = lostChildrenData.map((child) =>
          child._id === selectedChild._id ? { ...child, founded: true } : child
        );
        setLostChildrenData(updatedChildren);
        handleCloseModal(); 
        setShowConfirmation(false);
      } else {
        console.error('Error closing the case:', response.statusText);
      }
    } catch (error) {
      console.error('Error closing the case:', error);
    }
  };

  if (loading) {
    return <p>Loading data...</p>; 
  }

  return (
    <>
      <Card className="m-4 p-4 shadow-lg">
        <Card.Body>
          <Card.Title className="text-center">Lost Children Information</Card.Title>

          <DropdownButton id="dropdown-sort" title={`Sort by: ${sortKey} (${sortOrder})`} className="mb-3">
            <Dropdown.Item onClick={() => handleSort('childName')}>Sort by Child Name</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSort('age')}>Sort by Age</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSort('lastSeenLocation')}>Sort by Last Seen Location</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSort('lastSeenDate')}>Sort by Last Seen Date</Dropdown.Item>
          </DropdownButton>

          <Table striped bordered hover>
  <thead>
    <tr>
      <th>Child Name</th>
      <th>Age</th>
      <th>Gender</th>
      <th>Last Seen Location</th>
      <th>Last Seen Date</th>
    </tr>
  </thead>
  <tbody>
    {lostChildrenData
      .filter((child) => !child.founded) // Filter only cases where the child is not found
      .map((child, index) => (
        <tr key={index} onClick={() => handleRowClick(child)} style={{ cursor: 'pointer' }}>
          <td>{child.childName}</td>
          <td>{child.age}</td>
          <td>{child.gender}</td>
          <td>{child.lastSeenLocation}</td>
          <td>{new Date(child.lastSeenDate).toLocaleDateString()}</td>
        </tr>
      ))}
  </tbody>
</Table>


          <Pagination>
            {/* Pagination Logic */}
          </Pagination>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedChild?.childName}'s Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedChild && (
            <>
              <p><strong>Age:</strong> {selectedChild.age}</p>
              <p><strong>Gender:</strong> {selectedChild.gender}</p>
              <p><strong>Last Seen Location:</strong> {selectedChild.lastSeenLocation}</p>
              <p><strong>Last Seen Date:</strong> {new Date(selectedChild.lastSeenDate).toLocaleDateString()}</p>
              <p><strong>Description:</strong> {selectedChild.description}</p>
              <p><strong>Guardian Name:</strong> {selectedChild.guardianName}</p>
              <p><strong>Contact Info:</strong> {selectedChild.contactInfo}</p>
              <p><strong>Submitted by:</strong> {selectedChild.submittedBy}</p>

              {!selectedChild.founded && (
                <Button variant="danger" onClick={handleShowConfirmation}>
                  Close Case (Child Found)
                </Button>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Close Case</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to close the case for {selectedChild?.childName}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmation}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleCloseCase}>
            Confirm Close Case
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LatestNews;
