import React from 'react'
import Sidebar from '../Component/Sidebar/Sidebar'
import Navbar from '../Component/Navbar/CustomNavbar'
const Donate = () => {
  return (
    <div>
         <div style={{ position: 'fixed', top: '0', left: '0', zIndex: 2, height: '100vh', width: '250px' }}>
        <Sidebar />
      </div>

      {/* Sticky Navbar */}
      <div style={{ position: 'fixed', top: '0', left: '250px', right: '0', zIndex: 1, height: '60px' }}>
        <Navbar />
      </div>
      
    </div>
  )
}

export default Donate
