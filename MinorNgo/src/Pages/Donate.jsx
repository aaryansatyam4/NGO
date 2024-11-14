import React from 'react'
import DonateAmt from '../Component/Donate/DonateAmt'
import Sidebar from '../Component/Sidebar/Sidebar'; // Import Sidebar component
import Navbar from '../Component/Navbar/CustomNavbar.jsx'; // Import Navbar component

const Donate = () => {
  return (
    <div>
      {/* Fixed Sidebar */}
      <div style={{ position: 'fixed', top: '0', left: '0', zIndex: 2, height: '100vh', width: '250px' }}>
        <Sidebar />
      </div>

      {/* Sticky Navbar */}
      <div style={{ position: 'fixed', top: '0', left: '250px', right: '0', zIndex: 1, height: '60px' }}>
        <Navbar />
      </div>

      {/* Main Content - Gallery */}
      <div style={{ marginLeft: '250px', marginTop: '60px', padding: '20px' }}>
        <DonateAmt></DonateAmt>
      </div>
    </div>
  );
}

export default Donate