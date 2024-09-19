import React, { useState } from 'react';
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from '../Component/Navbar/CustomNavbar';
import UserProfileCard from '../Component/UserProfileCard/UserProfileCard';

const Profile = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div>
      {/* Fixed Sidebar */}
      {sidebarVisible && (
        <div style={{ position: 'fixed', top: '0', left: '0', zIndex: 2, height: '100vh', width: '250px' }}>
          <Sidebar />
        </div>
      )}

      {/* Sticky Navbar */}
      <div
        style={{
          position: 'fixed',
          top: '0',
          left: sidebarVisible ? '250px' : '0', // Adjust based on sidebar visibility
          right: '0',
          zIndex: 1,
          height: '60px',
          transition: 'left 0.3s ease',
        }}
      >
        <Navbar toggleSidebar={toggleSidebar} />
      </div>

      {/* Main Content */}
      <div
        style={{
          marginLeft: sidebarVisible ? '250px' : '0',
          marginTop: '60px',
          padding: '20px',
          transition: 'margin-left 0.3s ease',
        }}
      >
        <UserProfileCard />
      </div>
    </div>
  );
};

export default Profile;
