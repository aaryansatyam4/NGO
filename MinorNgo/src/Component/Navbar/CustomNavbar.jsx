import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function CustomNavbar() {
  const [location, setLocation] = useState('Select Location');
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCases, setUnreadCases] = useState([]); // Initialize as an empty array
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUnreadCases = async () => {
      try {
        const response = await axios.get('/unread-cases');
        if (Array.isArray(response.data)) { // Check if response data is an array
          setUnreadCases(response.data);
        } else {
          setUnreadCases([]); // If not, set an empty array
        }
      } catch (error) {
        console.error('Error fetching unread cases:', error);
        setUnreadCases([]); // Handle error by setting an empty array
      }
    };

    fetchUnreadCases();
  }, []);

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate('/login');
  };

  const handleOpenDropdown = async () => {
    setShowDropdown(true);
    try {
      await axios.put('/mark-cases-read');
      setUnreadCases([]);
    } catch (error) {
      console.error('Error marking cases as read:', error);
    }
  };

  const unreadCaseItems = unreadCases.map((unreadCase, index) => (
    <Dropdown.Item key={index}>
      {unreadCase.childName} - Last seen at {unreadCase.lastSeenLocation}
    </Dropdown.Item>
  ));

  return (
    <Navbar expand="lg" className="bg-body-tertiary sticky-top">
      <Container>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Dropdown
              show={showDropdown}
              onToggle={() => setShowDropdown(!showDropdown)}
              onClick={handleOpenDropdown}
            >
              <Dropdown.Toggle as={Nav.Link} id="dropdown-basic" className="p-0">
                <i className="bi bi-bell" style={{ fontSize: '24px', cursor: 'pointer' }}></i>
                {unreadCases.length > 0 && (
                  <span className="badge">{unreadCases.length}</span>
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {unreadCases.length > 0 ? unreadCaseItems : <Dropdown.Item>No new cases</Dropdown.Item>}
              </Dropdown.Menu>
            </Dropdown>

            <NavDropdown title={location} id="location-nav-dropdown" className="mx-3">
              <NavDropdown.Item onClick={() => setLocation('New York')}>New York</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setLocation('London')}>London</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setLocation('Tokyo')}>Tokyo</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title={<i className="bi bi-person-circle" style={{ fontSize: '24px' }}></i>}
              id="profile-nav-dropdown"
              align="end"
            >
              <NavDropdown.Item onClick={handleProfileClick}>Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
