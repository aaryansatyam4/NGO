import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

function CustomNavbar() {
  const [location, setLocation] = useState('Select Location');
  const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  // Random messages for the alerts
  const alertMessages = [
    "New Notification",
    "Server Update",
    "Message Received",
    "Security Alert",
    "New Location Added",
  ];

  // Generating 5 random alerts
  const randomAlerts = alertMessages.map((message, index) => (
    <Dropdown.Item key={index}>{message}</Dropdown.Item>
  ));

  // Function to navigate to the profile page
  const handleProfileClick = () => {
    navigate('/profile'); // Navigate to the profile route
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary sticky-top"> {/* Added sticky-top class */}
      <Container>
        
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center"> {/* align-items-center for vertical alignment */}
            {/* Notification Bell with Dropdown */}
            <Dropdown show={showDropdown} onToggle={() => setShowDropdown(!showDropdown)}>
              <Dropdown.Toggle as={Nav.Link} id="dropdown-basic" className="p-0">
                <i className="bi bi-bell" style={{ fontSize: '24px', cursor: 'pointer' }}></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {randomAlerts}
              </Dropdown.Menu>
            </Dropdown>

            {/* Location Dropdown */}
            <NavDropdown title={location} id="location-nav-dropdown" className="mx-3">
              <NavDropdown.Item onClick={() => setLocation('New York')}>
                New York
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => setLocation('London')}>
                London
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => setLocation('Tokyo')}>
                Tokyo
              </NavDropdown.Item>
            </NavDropdown>

            {/* Profile Icon and Dropdown */}
            <NavDropdown
              title={<i className="bi bi-person-circle" style={{ fontSize: '24px' }}></i>}
              id="profile-nav-dropdown"
              align="end"
            >
              <NavDropdown.Item onClick={handleProfileClick}>Profile</NavDropdown.Item> {/* Navigate on click */}
              <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
