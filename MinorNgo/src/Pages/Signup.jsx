import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [category, setCategory] = useState('');
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');

  const navigate = useNavigate(); // To navigate to /login after submission

  // Handler to update category selection
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  // Handler for photo upload
  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  // Handler for name change
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // Handler for mobile change
  const handleMobileChange = (event) => {
    setMobile(event.target.value);
  };

  // Handler for email change
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Handler for password change
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Handler for ID change
  const handleIdChange = (event) => {
    setId(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Prepare FormData for submission
    const formData = new FormData();
    formData.append('name', name);
    formData.append('mobile', mobile);
    formData.append('email', email);
    formData.append('category', category);
    formData.append('password', password);
    formData.append('id', id);
    formData.append('photo', photo); // Append the photo file
  
    // Log the FormData for debugging
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
  
    axios.post('http://localhost:3001/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(result => {
        console.log(result);
        navigate('/login'); // Navigate to /login after successful registration
      })
      .catch(err => {
        if (err.response) {
          console.log('Error Response:', err.response.data);
        } else {
          console.log('Error:', err.message);
        }
      });
  };
  
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: '36rem', borderRadius: '15px' }}>
        <h3 className="text-center mb-4">Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Left Column: Form Fields */}
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="mobile">Mobile</label>
                <input
                  type="text"
                  className="form-control"
                  id="mobile"
                  placeholder="Enter mobile number"
                  value={mobile}
                  onChange={handleMobileChange}
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="category">Category</label>
                <select
                  className="form-control"
                  id="category"
                  value={category}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select Category</option>
                  <option value="user">User</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="police">Police</option>
                  <option value="investigation">Investigation Department</option>
                </select>
              </div>

              {/* Show ID field if category is "police" or "investigation" */}
              {['police', 'investigation'].includes(category) && (
                <div className="form-group mb-3">
                  <label htmlFor="id">Police ID/Investigation ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="id"
                    placeholder="Enter ID"
                    value={id}
                    onChange={handleIdChange}
                  />
                </div>
              )}

              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

            {/* Right Column: Photo Upload */}
            <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
              <div className="photo-container mb-3">
                {photo ? (
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Uploaded"
                    style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                ) : (
                  <div
                    style={{
                      width: '150px',
                      height: '150px',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '8px',
                      backgroundColor: '#f8f9fa',
                    }}
                  >
                    <span>Photo</span>
                  </div>
                )}
              </div>
              <label htmlFor="photo" className="text-center">Face should be visible</label>
              <input
                type="file"
                className="form-control mt-2"
                id="photo"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-4">Submit</button>
        </form>

        <div className="text-center mt-3">
          <p>Already have an account? <Link to="/login" className="text-primary">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
