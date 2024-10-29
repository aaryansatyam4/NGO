import React from 'react';
import Sidebar from '../Component/Sidebar/Sidebar'; // Import Sidebar component
import Navbar from '../Component/Navbar/CustomNavbar'; // Import Navbar component
import UpComingEvents from '../Component/Events/UpComingEvents'; // Import UpComingEvents component
import PastEvents from '../Component/Events/PastEvents'; // Import PastEvents component
import CreateEvents from '../Component/CreateEvents/CreateEvents';

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
      <div className="d-flex" style={{ marginTop: '60px', marginLeft: '250px', paddingRight: '15px', width: 'calc(100% - 250px)' }}>
        <div className="container-fluid">
          <div className="row">
            <CreateEvents/>
          </div>
          <div className="row">
            {/* Upcoming Events */}
            <div className="col-md-6">
              <UpComingEvents />
            </div>
            {/* Past Events */}
            <div className="col-md-6">
              <PastEvents />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
