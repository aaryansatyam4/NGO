import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdoptChildForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    preferredAge: '',
    preferredGender: '',
    income: '',
  });
  
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to check if all form fields are filled
  const allFieldsFilled = Object.values(formData).every(field => field !== '');

  // Function to request an OTP
  const handleSendOtp = async () => {
    if (!allFieldsFilled) {
      setErrorMessage('Please fill out all fields before requesting OTP.');
      return;
    }
  
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.post('http://localhost:3001/send-otp', { email: formData.email });
      setOtpSent(true);
      setSuccessMessage(response.data.message);
    } catch (error) {
      console.error('Error in handleSendOtp:', error);
      setErrorMessage(error.response?.data?.message || 'Error sending OTP');
    } finally {
      setLoading(false);
    }
  };
  
  const handleVerifyOtp = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.post('http://localhost:3001/verify-otp', { email: formData.email, otp });
      setOtpVerified(true);
      setSuccessMessage(response.data.message);
    } catch (error) {
      console.error('Error in handleVerifyOtp:', error);
      setErrorMessage(error.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
  
    if (!otpVerified) {
      setErrorMessage('Please verify your OTP before submitting the form.');
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3001/adopt-child', formData);
      setSuccessMessage(response.data.message);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        preferredAge: '',
        preferredGender: '',
        income: '',
      });
      setOtp('');
      setOtpSent(false);
      setOtpVerified(false);
    } catch (error) {
      console.error('Error in handleSubmitForm:', error); // Log the complete error
      setErrorMessage(error.response?.data?.message || 'Error submitting form');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Adopt a Child</h1>

      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <Form onSubmit={handleSubmitForm}>
        <h3>Applicant Information</h3>
        <div className="row mb-3">
          <div className="col-md-6">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              required
              disabled={otpSent}
            />
          </div>
          <div className="col-md-6">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              required
              disabled={otpSent}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
              disabled={otpSent}
            />
          </div>
          <div className="col-md-6">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              pattern="[0-9]{10}"
              required
              disabled={otpSent}
            />
          </div>
        </div>

        <h3>Address</h3>
        <Form.Group className="mb-3">
          <Form.Label>Street Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter street address"
            required
            disabled={otpSent}
          />
        </Form.Group>

        <div className="row mb-3">
          <div className="col-md-4">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              required
              disabled={otpSent}
            />
          </div>
          <div className="col-md-4">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter state"
              required
              disabled={otpSent}
            />
          </div>
          <div className="col-md-4">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              placeholder="Enter zip code"
              pattern="[0-9]{5}"
              required
              disabled={otpSent}
            />
          </div>
        </div>

        <h3>Child Preferences</h3>
        <div className="row mb-3">
          <div className="col-md-6">
            <Form.Label>Preferred Age</Form.Label>
            <Form.Select
              name="preferredAge"
              value={formData.preferredAge}
              onChange={handleChange}
              required
              disabled={otpSent}
            >
              <option value="" disabled>Select age range</option>
              <option>0 - 2 years</option>
              <option>2 - 5 years</option>
              <option>5 - 10 years</option>
              <option>10+ years</option>
            </Form.Select>
          </div>
          <div className="col-md-6">
            <Form.Label>Preferred Gender</Form.Label>
            <Form.Select
              name="preferredGender"
              value={formData.preferredGender}
              onChange={handleChange}
              required
              disabled={otpSent}
            >
              <option value="" disabled>Select gender preference</option>
              <option>Male</option>
              <option>Female</option>
              <option>No Preference</option>
            </Form.Select>
          </div>
        </div>

        <h3>Legal and Financial Information</h3>
        <Form.Group className="mb-3">
          <Form.Label>Annual Income</Form.Label>
          <Form.Control
            type="number"
            name="income"
            value={formData.income}
            onChange={handleChange}
            placeholder="Enter annual income"
            required
            disabled={otpSent}
          />
        </Form.Group>

        <h3>Verification</h3>
        <div className="row mb-3">
          <div className="col-md-6">
            <Form.Label>OTP</Form.Label>
            <Form.Control
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP sent to email"
              disabled={!otpSent}
              required
            />
          </div>
          <div className="col-md-6 d-flex align-items-end">
            {!otpSent && (
              <Button variant="primary" onClick={handleSendOtp} disabled={loading || !allFieldsFilled}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Send OTP'}
              </Button>
            )}
            {otpSent && !otpVerified && (
              <Button variant="success" onClick={handleVerifyOtp} disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Verify OTP'}
              </Button>
            )}
          </div>
        </div>

        <Button type="submit" variant="success" className="mt-3" disabled={!otpVerified || loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Submit Application'}
        </Button>
      </Form>
    </div>
  ); 
};

export default AdoptChildForm;
