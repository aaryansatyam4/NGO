import React from 'react';
import Sidebar from '../Component/Sidebar/Sidebar'; // Import Sidebar component
import Navbar from '../Component/Navbar/CustomNavbar'; // Import Navbar component
import UpComingEvents from '../Component/UpComingEvents/UpComingEvents'; // Import UpComingEvents component

const Events = () => {
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
        <div className="content p-4" style={{ width: '100%' }}>
          {/* Upcoming Events List */}
          <UpComingEvents />
        </div>
      </div>
    </div>
  );
};

export default Events;
