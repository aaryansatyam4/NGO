import React from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import Sidebar from '../Component/Sidebar/Sidebar'; // Assuming you have a Sidebar component
import Navbar from '../Component/Navbar/CustomNavbar'; // Assuming you have a Navbar component

const ReportLostChild = () => {
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
                  <Form>
                    {/* Child's Name */}
                    <Form.Group className="mb-3" controlId="formChildName">
                      <Form.Label>Child's Full Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter child's full name" required />
                    </Form.Group>

                    {/* Age */}
                    <Form.Group className="mb-3" controlId="formChildAge">
                      <Form.Label>Age</Form.Label>
                      <Form.Control type="number" placeholder="Enter child's age" required />
                    </Form.Group>

                    {/* Last Seen Date */}
                    <Form.Group className="mb-3" controlId="formLastSeenDate">
                      <Form.Label>Date Last Seen</Form.Label>
                      <Form.Control type="date" required />
                    </Form.Group>

                    {/* Last Seen Location */}
                    <Form.Group className="mb-3" controlId="formLastSeenLocation">
                      <Form.Label>Last Seen Location</Form.Label>
                      <Form.Control type="text" placeholder="Enter last known location" required />
                    </Form.Group>

                    {/* Image Upload */}
                    <Form.Group className="mb-3" controlId="formChildImage">
                      <Form.Label>Upload a Recent Photo</Form.Label>
                      <Form.Control type="file" accept="image/*" required />
                    </Form.Group>

                    {/* Description */}
                    <Form.Group className="mb-3" controlId="formDescription">
                      <Form.Label>Description (Clothes, appearance, etc.)</Form.Label>
                      <Form.Control as="textarea" rows={3} placeholder="Provide any identifiable information" />
                    </Form.Group>

                    {/* Parent/Guardian Name */}
                    <Form.Group className="mb-3" controlId="formGuardianName">
                      <Form.Label>Parent/Guardian Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter parent/guardian's full name" required />
                    </Form.Group>

                    {/* Contact Information */}
                    <Form.Group className="mb-3" controlId="formContactInfo">
                      <Form.Label>Contact Information (Phone/Email)</Form.Label>
                      <Form.Control type="text" placeholder="Enter contact details" required />
                    </Form.Group>

                    {/* Additional Comments */}
                    <Form.Group className="mb-4" controlId="formAdditionalComments">
                      <Form.Label>Additional Information or Comments</Form.Label>
                      <Form.Control as="textarea" rows={3} placeholder="Enter any other relevant details" />
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
