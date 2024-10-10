import React, { useState } from 'react';
import Sidebar from '../Component/Sidebar/Sidebar'; // Import Sidebar component
import Navbar from '../Component/Navbar/CustomNavbar.jsx'; // Import Navbar component
import axios from 'axios'; // For sending data to the backend

const AddLostChild = () => {
  // State to handle form input
  const [formData, setFormData] = useState({
    emailId: '', // Fixed to store email ID
    parentName: '',
    contactNumber: '',
    childName: '',
    age: '',
    gender: '',
    lastSeen: '',
    description: '',
    childPhoto: null,
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create FormData object to include the file and other form data
    const formDataToSend = new FormData();
    formDataToSend.append('emailId', formData.emailId);
    formDataToSend.append('parentName', formData.parentName);
    formDataToSend.append('contactNumber', formData.contactNumber);
    formDataToSend.append('childName', formData.childName);
    formDataToSend.append('age', formData.age);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('lastSeen', formData.lastSeen);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('childPhoto', formData.childPhoto); // File input
    
    try {
      const response = await axios.post('http://localhost:3001/add-lost-child', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file upload
        },
      });
      console.log(response.data);
      alert('Lost child data submitted successfully');
    } catch (error) {
      console.error(error);
      alert('Error submitting the form');
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

      {/* Main Content */}
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', marginLeft: '250px', marginTop: '60px' }}>
        <div className="card shadow-lg" style={{ maxWidth: '600px', width: '100%' }}>
          <div className="card-body p-4">
            <h2 className="card-title text-center mb-4">Report Lost Child</h2>
            <form onSubmit={handleSubmit}>
              {/* Email ID */}
              <div className="mb-3">
                <label className="form-label" htmlFor="emailId">Email Id</label>
                <input 
                  className="form-control" 
                  id="emailId" 
                  name="emailId" 
                  type="email" 
                  value={formData.emailId} 
                  onChange={handleChange} 
                  placeholder="Enter your email id" 
                  required 
                />
              </div>

              {/* Parent Name */}
              <div className="mb-3">
                <label className="form-label" htmlFor="parentName">Parent's Name</label>
                <input 
                  className="form-control" 
                  id="parentName" 
                  name="parentName" 
                  type="text" 
                  value={formData.parentName} 
                  onChange={handleChange} 
                  placeholder="Enter parent's full name" 
                  required 
                />
              </div>

              {/* Contact Number */}
              <div className="mb-3">
                <label className="form-label" htmlFor="contactNumber">Contact Number</label>
                <input 
                  className="form-control" 
                  id="contactNumber" 
                  name="contactNumber" 
                  type="tel" 
                  value={formData.contactNumber} 
                  onChange={handleChange} 
                  placeholder="Enter contact number" 
                  required 
                />
              </div>

              {/* Child Name */}
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
                <label className="form-label" htmlFor="lastSeen">Last Seen Location</label>
                <input 
                  className="form-control" 
                  id="lastSeen" 
                  name="lastSeen" 
                  type="text" 
                  value={formData.lastSeen} 
                  onChange={handleChange} 
                  placeholder="Enter location where child was last seen" 
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
