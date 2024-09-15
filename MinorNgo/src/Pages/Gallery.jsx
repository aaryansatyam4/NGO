import React from 'react';
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from '../Component/Navbar/CustomNavbar';
import GalleryImages from '../Component/GalleryImages/GalleryImages'; // Assuming GalleryImages is in the same folder

const Gallery = () => {
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
        <GalleryImages />
      </div>
    </div>
  );
};

export default Gallery;
