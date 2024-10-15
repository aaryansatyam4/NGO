import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import Sidebar from '../Component/Sidebar/Sidebar'; // Assuming you have a Sidebar component
import Navbar from '../Component/Navbar/CustomNavbar'; // Assuming you have a Navbar component
import axios from 'axios'; // For sending data to the backend

const ReportLostChild = () => {
  // State to handle form input
  const [formData, setFormData] = useState({
    parentName: '',
    contactNumber: '',
    childName: '',
    age: '',
    gender: '',
    lastSeen: '',
    description: '',
    childPhoto: null,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      childPhoto: file,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('parentName', formData.parentName);
    formDataToSend.append('contactNumber', formData.contactNumber);
    formDataToSend.append('childName', formData.childName);
    formDataToSend.append('age', formData.age);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('lastSeen', formData.lastSeen);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('childPhoto', formData.childPhoto); // File input

    try {
      const response = await axios.post('http://localhost:3001/add-missing-child', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Missing child report submitted successfully');
    } catch (error) {
      console.error(error);
      alert('Error submitting the report');
    }
  };

  return (
    <div>
      {/* Sticky Sidebar */}
      <div style={{ position: 'fixed', top: '0', left: '0', zIndex: 2, height: '100vh', width: '250px' }}>
        <Sidebar />
      </div>

      {/* Sticky Navbar */}
      <div style={{ position: 'fixed', top: '0', left: '250px', right: '0', zIndex: 1, height: '60px' }}>
        <Navbar />
      </div>

      {/* Main Content Area */}
      <div className="d-flex" style={{ marginTop: '60px', marginLeft: '250px' }}>
        <Container className="p-4">
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="shadow-lg p-4 mb-5 bg-white rounded">
                <Card.Body>
                  <h3 className="text-center mb-4">Report a Missing Child</h3>
                  <p className="text-center text-muted mb-4">
                    Please provide as much information as possible to help us find the missing child.
                  </p>

                  {/* Report Missing Child Form */}
                  <Form onSubmit={handleSubmit}>
                    {/* Parent's Name */}
                    <Form.Group className="mb-3" controlId="formParentName">
                      <Form.Label>Parent's Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleChange} 
                        placeholder="Enter parent's name" 
                        required 
                      />
                    </Form.Group>

                    {/* Contact Number */}
                    <Form.Group className="mb-3" controlId="formContactNumber">
                      <Form.Label>Contact Number</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange} 
                        placeholder="Enter contact number" 
                        required 
                      />
                    </Form.Group>

                    {/* Child's Name */}
                    <Form.Group className="mb-3" controlId="formChildName">
                      <Form.Label>Child's Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="childName"
                        value={formData.childName}
                        onChange={handleChange} 
                        placeholder="Enter child's full name" 
                        required 
                      />
                    </Form.Group>

                    {/* Age */}
                    <Form.Group className="mb-3" controlId="formChildAge">
                      <Form.Label>Age</Form.Label>
                      <Form.Control 
                        type="number" 
                        name="age"
                        value={formData.age}
                        onChange={handleChange} 
                        placeholder="Enter child's age" 
                        required 
                      />
                    </Form.Group>

                    {/* Gender */}
                    <Form.Group className="mb-3" controlId="formChildGender">
                      <Form.Label>Gender</Form.Label>
                      <Form.Select 
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>

                    {/* Last Seen Location */}
                    <Form.Group className="mb-3" controlId="formLastSeenLocation">
                      <Form.Label>Last Seen Location</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="lastSeen"
                        value={formData.lastSeen}
                        onChange={handleChange} 
                        placeholder="Enter last known location" 
                        required 
                      />
                    </Form.Group>

                    {/* Image Upload */}
                    <Form.Group className="mb-3" controlId="formChildImage">
                      <Form.Label>Upload a Recent Photo</Form.Label>
                      <Form.Control 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange} 
                        required 
                      />
                    </Form.Group>

                    {/* Description */}
                    <Form.Group className="mb-3" controlId="formDescription">
                      <Form.Label>Description (Clothes, appearance, etc.)</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={3} 
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Provide any identifiable information" 
                      />
                    </Form.Group>

                    {/* Submit Button */}
                    <div className="d-grid">
                      <Button variant="danger" type="submit">
                        Submit Report
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ReportLostChild;
