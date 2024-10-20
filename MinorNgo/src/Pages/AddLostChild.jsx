import React, { useState, useEffect } from 'react';
import Sidebar from '../Component/Sidebar/Sidebar'; // Import Sidebar component
import Navbar from '../Component/Navbar/CustomNavbar.jsx'; // Import Navbar component
import axios from 'axios'; // For sending data to the backend

const AddLostChild = () => {
  const [formData, setFormData] = useState({
    childName: '',
    age: '',
    gender: '',
    lastSeen: '',
    description: '',
    childPhoto: null,
    guardianName: '',
    contactInfo: '',
    additionalComments: '',
    lastSeenLocation: '', // Added lastSeenLocation
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('childName', formData.childName);
    formDataToSend.append('age', formData.age);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('lastSeen', formData.lastSeen);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('guardianName', formData.guardianName);
    formDataToSend.append('contactInfo', formData.contactInfo);
    formDataToSend.append('additionalComments', formData.additionalComments);
    formDataToSend.append('lastSeenLocation', formData.lastSeenLocation); // Added lastSeenLocation to submission
    formDataToSend.append('childPhoto', formData.childPhoto); // Ensure the file input is correctly appended

    try {
      const response = await axios.post('http://localhost:3001/add-lost-child', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure multipart/form-data
        },
        withCredentials: true, // Ensure cookies are sent
      });
      console.log(response.data);
      alert('Lost child report submitted successfully');
    } catch (error) {
      console.error('Error submitting the form:', error.response ? error.response.data : error.message);
      alert('Error submitting the form');
    }
  };

  // File change handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      childPhoto: file, // Make sure this sets the file correctly
    }));
  };

  // General input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

      {/* Main Content */}
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', marginLeft: '250px', marginTop: '60px' }}>
        <div className="card shadow-lg" style={{ maxWidth: '600px', width: '100%' }}>
          <div className="card-body p-4">
            <h2 className="card-title text-center mb-4">Report Lost Child</h2>
            <form onSubmit={handleSubmit}>
              {/* Child's Name */}
              <div className="mb-3">
                <label className="form-label" htmlFor="childName">Child's Name</label>
                <input 
                  className="form-control" 
                  id="childName" 
                  name="childName" 
                  type="text" 
                  value={formData.childName} 
                  onChange={handleChange} 
                  placeholder="Enter child's full name" 
                  required 
                />
              </div>

              {/* Age */}
              <div className="mb-3">
                <label className="form-label" htmlFor="age">Child's Age</label>
                <input 
                  className="form-control" 
                  id="age" 
                  name="age" 
                  type="number" 
                  value={formData.age} 
                  onChange={handleChange} 
                  placeholder="Enter child's age" 
                  required 
                />
              </div>

              {/* Gender */}
              <div className="mb-3">
                <label className="form-label" htmlFor="gender">Gender</label>
                <select 
                  className="form-select" 
                  id="gender" 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Last Seen Location */}
              <div className="mb-3">
                <label className="form-label" htmlFor="lastSeenLocation">Last Seen Location</label>
                <input 
                  className="form-control" 
                  id="lastSeenLocation" 
                  name="lastSeenLocation" 
                  type="text" 
                  value={formData.lastSeenLocation} 
                  onChange={handleChange} 
                  placeholder="Enter last known location" 
                  required 
                />
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label" htmlFor="description">Description</label>
                <textarea 
                  className="form-control" 
                  id="description" 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  placeholder="Provide additional details about the child" 
                  rows="3" 
                  required 
                ></textarea>
              </div>

              {/* Guardian's Name */}
              <div className="mb-3">
                <label className="form-label" htmlFor="guardianName">Guardian's Name</label>
                <input 
                  className="form-control" 
                  id="guardianName" 
                  name="guardianName" 
                  type="text" 
                  value={formData.guardianName} 
                  onChange={handleChange} 
                  placeholder="Enter guardian's full name" 
                  required 
                />
              </div>

              {/* Contact Information */}
              <div className="mb-3">
                <label className="form-label" htmlFor="contactInfo">Contact Information</label>
                <input 
                  className="form-control" 
                  id="contactInfo" 
                  name="contactInfo" 
                  type="text" 
                  value={formData.contactInfo} 
                  onChange={handleChange} 
                  placeholder="Enter contact information" 
                  required 
                />
              </div>

              {/* Additional Comments */}
              <div className="mb-3">
                <label className="form-label" htmlFor="additionalComments">Additional Comments</label>
                <textarea 
                  className="form-control" 
                  id="additionalComments" 
                  name="additionalComments" 
                  value={formData.additionalComments} 
                  onChange={handleChange} 
                  placeholder="Any additional information" 
                  rows="3"
                ></textarea>
              </div>

              {/* Upload Child Photo */}
              <div className="mb-3">
                <label className="form-label" htmlFor="childPhoto">Upload Child's Photo</label>
                <input 
                  className="form-control" 
                  id="childPhoto" 
                  name="childPhoto" 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange} 
                  required
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn btn-primary w-100"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLostChild;
