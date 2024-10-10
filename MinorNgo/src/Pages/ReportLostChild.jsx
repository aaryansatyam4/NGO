import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import Sidebar from '../Component/Sidebar/Sidebar'; // Assuming you have a Sidebar component
import Navbar from '../Component/Navbar/CustomNavbar'; // Assuming you have a Navbar component
import axios from 'axios'; // For sending data to the backend

const ReportLostChild = () => {
  // State to handle form input
  const [formData, setFormData] = useState({
    emailId: '',
    childName: '',
    age: '',
    lastSeenDate: '',
    lastSeenLocation: '',
    description: '',
    guardianName: '',
    contactInfo: '',
    additionalComments: '',
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
    formDataToSend.append('emailId', formData.emailId);
    formDataToSend.append('childName', formData.childName);
    formDataToSend.append('age', formData.age);
    formDataToSend.append('lastSeenDate', formData.lastSeenDate);
    formDataToSend.append('lastSeenLocation', formData.lastSeenLocation);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('guardianName', formData.guardianName);
    formDataToSend.append('contactInfo', formData.contactInfo);
    formDataToSend.append('additionalComments', formData.additionalComments);
    formDataToSend.append('childPhoto', formData.childPhoto); // File input
    
    try {
      const response = await axios.post('http://localhost:3001/add-lost-child', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Lost child report submitted successfully');
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
                  <h3 className="text-center mb-4">Report a Lost Child</h3>
                  <p className="text-center text-muted mb-4">
                    Please provide as much information as possible to help us find the lost child.
                  </p>

                  {/* Report Lost Child Form */}
                  <Form onSubmit={handleSubmit}>
                    {/* Email Id */}
                    <Form.Group className="mb-3" controlId="formEmailId">
                      <Form.Label>Email Id</Form.Label>
                      <Form.Control 
                        type="email" 
                        name="emailId"
                        value={formData.emailId}
                        onChange={handleChange} 
                        placeholder="Enter your email" 
                        required 
                      />
                    </Form.Group>

                    {/* Child's Name */}
                    <Form.Group className="mb-3" controlId="formChildName">
                      <Form.Label>Child's Full Name</Form.Label>
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

                    {/* Last Seen Date */}
                    <Form.Group className="mb-3" controlId="formLastSeenDate">
                      <Form.Label>Date Last Seen</Form.Label>
                      <Form.Control 
                        type="date" 
                        name="lastSeenDate"
                        value={formData.lastSeenDate}
                        onChange={handleChange} 
                        required 
                      />
                    </Form.Group>

                    {/* Last Seen Location */}
                    <Form.Group className="mb-3" controlId="formLastSeenLocation">
                      <Form.Label>Last Seen Location</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="lastSeenLocation"
                        value={formData.lastSeenLocation}
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

                    {/* Parent/Guardian Name */}
                    <Form.Group className="mb-3" controlId="formGuardianName">
                      <Form.Label>Parent/Guardian Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="guardianName"
                        value={formData.guardianName}
                        onChange={handleChange} 
                        placeholder="Enter parent/guardian's full name" 
                        required 
                      />
                    </Form.Group>

                    {/* Contact Information */}
                    <Form.Group className="mb-3" controlId="formContactInfo">
                      <Form.Label>Contact Information (Phone/Email)</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="contactInfo"
                        value={formData.contactInfo}
                        onChange={handleChange} 
                        placeholder="Enter contact details" 
                        required 
                      />
                    </Form.Group>

                    {/* Additional Comments */}
                    <Form.Group className="mb-4" controlId="formAdditionalComments">
                      <Form.Label>Additional Information or Comments</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={3} 
                        name="additionalComments"
                        value={formData.additionalComments}
                        onChange={handleChange}
                        placeholder="Enter any other relevant details" 
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
