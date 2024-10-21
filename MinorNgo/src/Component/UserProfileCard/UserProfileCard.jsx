import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReportedLostChildren from '../Reported/ReportedLostChildren';
import ReportedMissingChildren from '../Reported/ReportedMissingChildren';

const UserProfileCard = () => {
  const [userData, setUserData] = useState(null);

  // Helper function to read the cookie
  const getCookie = (cookieName) => {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return "";
  };

  useEffect(() => {
    const userId = getCookie('userId'); // Get userId from cookie

    if (userId) {
      axios.get(`http://localhost:3001/user/${userId}`)
        .then(response => {
          setUserData(response.data); // Store the user data in state
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }
console.log(userData.photo);
  // Determine profile picture URL
  const profilePicture = userData.photo
  ? `http://localhost:3001/userpic/${userData.photo}` // Prepend the full URL
  : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"; // Default image if none uploaded

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src={profilePicture}
                  alt="User Avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: '150px' }}
                />
                <h5 className="my-3">{userData.name}</h5>
                <p className="text-muted mb-1">{userData.category}</p>
                <p className="text-muted mb-4">New Delhi, India</p>
                <div className="d-flex justify-content-center mb-2">
                  <button type="button" className="btn btn-outline-primary ms-1">Message</button>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="card mb-4 mb-lg-0">
              <div className="card-body p-0">
                <ul className="list-group list-group-flush rounded-3">
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fas fa-globe fa-lg text-warning"></i>
                    <p className="mb-0">https://saveourchildren.org.in</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fab fa-github fa-lg text-body"></i>
                    <p className="mb-0">saveourchildren</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fab fa-twitter fa-lg" style={{ color: '#55acee' }}></i>
                    <p className="mb-0">@saveourchildren</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fab fa-instagram fa-lg" style={{ color: '#ac2bac' }}></i>
                    <p className="mb-0">saveourchildren</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fab fa-facebook-f fa-lg" style={{ color: '#3b5998' }}></i>
                    <p className="mb-0">saveourchildren</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{userData.name}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{userData.email}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{userData.mobile}</p>
                  </div>
                </div>
                <hr />
        
              </div>
            </div>
            <ReportedLostChildren/>
            <ReportedMissingChildren/>

            {/* Project Status */}
            <div className="row">
              {/* Add your project status components here */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfileCard;
