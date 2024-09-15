import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const AdoptChildForm = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Adopt a Child</h1>
      <form>
        {/* Applicant Information */}
        <h3>Applicant Information</h3>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input type="text" className="form-control" id="firstName" placeholder="Enter first name" required />
          </div>
          <div className="col-md-6">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="lastName" placeholder="Enter last name" required />
          </div>
        </div>
        
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Enter your email" required />
          </div>
          <div className="col-md-6">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input type="tel" className="form-control" id="phone" placeholder="Enter phone number" pattern="[0-9]{10}" required />
            <small className="text-muted">Phone number must be 10 digits.</small>
          </div>
        </div>

        {/* Address */}
        <h3>Address</h3>
        <div className="row mb-3">
          <div className="col-md-12">
            <label htmlFor="address" className="form-label">Street Address</label>
            <input type="text" className="form-control" id="address" placeholder="Enter street address" required />
          </div>
        </div>
        
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="city" className="form-label">City</label>
            <input type="text" className="form-control" id="city" placeholder="Enter city" required />
          </div>
          <div className="col-md-4">
            <label htmlFor="state" className="form-label">State</label>
            <select className="form-select" id="state" required>
              <option value="" disabled selected>Select your state</option>
              <option>New York</option>
              <option>California</option>
              <option>Florida</option>
              {/* Add more states as needed */}
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="zip" className="form-label">Zip Code</label>
            <input type="text" className="form-control" id="zip" placeholder="Enter zip code" pattern="[0-9]{5}" required />
          </div>
        </div>

        {/* Child Preferences */}
        <h3>Child Preferences</h3>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="preferredAge" className="form-label">Preferred Age</label>
            <select className="form-select" id="preferredAge" required>
              <option value="" disabled selected>Select age range</option>
              <option>0 - 2 years</option>
              <option>2 - 5 years</option>
              <option>5 - 10 years</option>
              <option>10+ years</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="preferredGender" className="form-label">Preferred Gender</label>
            <select className="form-select" id="preferredGender" required>
              <option value="" disabled selected>Select gender preference</option>
              <option>Male</option>
              <option>Female</option>
              <option>No Preference</option>
            </select>
          </div>
        </div>

        {/* Legal and Financial Information */}
        <h3>Legal and Financial Information</h3>
        <div className="row mb-3">
          <div className="col-md-12">
            <label htmlFor="income" className="form-label">Annual Income</label>
            <input type="number" className="form-control" id="income" placeholder="Enter annual income" required />
          </div>
        </div>
        
        <div className="mb-3">
          <label htmlFor="legalDocuments" className="form-label">Upload Legal Documents (ID, Proof of Income)</label>
          <input className="form-control" type="file" id="legalDocuments" multiple required />
        </div>
        
        <div className="form-check mb-3">
          <input className="form-check-input" type="checkbox" id="agreement" required />
          <label className="form-check-label" htmlFor="agreement">
            I agree to the terms and conditions of the adoption process.
          </label>
        </div>

        {/* Verification Section */}
        <h3>Verification</h3>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="otp" className="form-label">OTP Verification</label>
            <input type="text" className="form-control" id="otp" placeholder="Enter OTP sent to your phone" required />
          </div>
          <div className="col-md-6 d-flex align-items-end">
            <button type="button" className="btn btn-primary">Generate OTP</button>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-success">Submit Application</button>
      </form>
    </div>
  );
};

export default AdoptChildForm;
