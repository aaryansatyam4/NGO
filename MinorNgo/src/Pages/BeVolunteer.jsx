import React, { useState } from 'react';
import Sidebar from '../Component/Sidebar/Sidebar'; // Import Sidebar component
import Navbar from '../Component/Navbar/CustomNavbar.jsx'; // Import Navbar component

const BeVolunteer = () => {
  // State for storing the selected state and city
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState([]);

  // List of states and cities
  const stateCityData = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
    "Karnataka": ["Bengaluru", "Mysuru", "Mangalore", "Hubli"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
    "West Bengal": ["Kolkata", "Darjeeling", "Howrah", "Siliguri"],
    // Add more states and cities as needed
  };

  // Function to handle state change and update city options
  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setCities(stateCityData[state] || []); // Update cities based on selected state
    setSelectedCity(''); // Reset city selection
  };

  // Function to handle city change
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
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

      {/* Content */}
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', marginLeft: '250px', marginTop: '60px' }}>
        <div className="card shadow-lg" style={{ maxWidth: '600px', width: '100%' }}>
          <div className="card-body p-4">
            <h2 className="card-title text-center mb-4">Be a Volunteer</h2>
            <form>
              {/* Full Name */}
              <div className="mb-3">
                <label className="form-label" htmlFor="name">Full Name</label>
                <input 
                  className="form-control" 
                  id="name" 
                  type="text" 
                  placeholder="John Doe" 
                  required 
                />
              </div>

              {/* Occupation */}
              <div className="mb-3">
                <label className="form-label" htmlFor="occupation">Occupation</label>
                <input 
                  className="form-control" 
                  id="occupation" 
                  type="text" 
                  placeholder="Your Occupation" 
                  required 
                />
              </div>

              {/* State */}
              <div className="mb-3">
                <label className="form-label" htmlFor="state">State</label>
                <select 
                  className="form-select" 
                  id="state" 
                  value={selectedState} 
                  onChange={handleStateChange}
                  required
                >
                  <option value="">Select State</option>
                  {Object.keys(stateCityData).map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div className="mb-3">
                <label className="form-label" htmlFor="city">City</label>
                <select 
                  className="form-select" 
                  id="city" 
                  value={selectedCity} 
                  onChange={handleCityChange} 
                  required
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Availability */}
              <div className="mb-3">
                <label className="form-label" htmlFor="availability">Availability</label>
                <select 
                  className="form-select" 
                  id="availability" 
                  required
                >
                  <option value="">Select Availability</option>
                  <option value="Weekdays">Weekdays</option>
                  <option value="Weekends">Weekends</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                </select>
              </div>

              {/* Time Commitment */}
              <div className="mb-3">
                <label className="form-label" htmlFor="time">Time Commitment per Week (in hours)</label>
                <input 
                  className="form-control" 
                  id="time" 
                  type="number" 
                  placeholder="Enter hours" 
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

export default BeVolunteer;
