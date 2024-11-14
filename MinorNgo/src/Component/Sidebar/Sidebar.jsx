import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBars } from 'react-icons/fa';
import { BsPerson, BsFileEarmarkText } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation

const Sidebar = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation(); // Get the current location

  // Function to determine if the link is active
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="d-flex">
      {/* Hamburger button and NGO heading */}
      <div style={{ 
        position: 'fixed', 
        top: '10px', 
        left: '10px', 
        zIndex: '1000', 
        display: 'flex', 
        alignItems: 'center' 
      }}>
        <button
          className="btn btn-light"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          style={{ marginRight: '10px' }} 
        >
          <FaBars />
        </button>
        <h4 className="m-0">NanheKadam</h4>
      </div>

      {/* Sidebar */}
      <div className={`d-flex flex-column p-3 bg-light ${isSidebarCollapsed ? 'collapsed' : ''}`} style={{ 
        width: isSidebarCollapsed ? '80px' : '250px', 
        height: '100vh', 
        transition: 'width 0.3s', 
        position: 'fixed', 
        top: '0',
        left: '0',
        zIndex: '999',
        paddingTop: '60px' 
      }}>
        <ul className="nav nav-pills flex-column mb-auto">
          {/* Dash Board */}
          <li className="nav-item" style={{ marginTop: '50px' }}>
            <Link to="/DashBoard" className={`nav-link text-decoration-none ${isActive('/DashBoard')} ${isSidebarCollapsed ? 'text-center' : ''}`}>
              {isSidebarCollapsed ? <BsPerson /> : 'Dashboard'}
            </Link>
          </li>

          {/* Report Lost Child */}
          <li className="nav-item">
            <Link to="/report-lost-child" className={`nav-link text-decoration-none ${isActive('/report-lost-child')} ${isSidebarCollapsed ? 'text-center' : ''}`}>
              {isSidebarCollapsed ? <BsFileEarmarkText /> : 'Report Child'}
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/AddLostChild" className={`nav-link text-decoration-none ${isActive('/AddLostChild')} ${isSidebarCollapsed ? 'text-center' : ''}`}>
              {isSidebarCollapsed ? <BsFileEarmarkText /> : 'Add Lost Child'}
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/Events" className={`nav-link text-decoration-none ${isActive('/Events')} ${isSidebarCollapsed ? 'text-center' : ''}`}>
              {isSidebarCollapsed ? <BsFileEarmarkText /> : 'Events'}
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/Donate" className={`nav-link text-decoration-none ${isActive('/Donate')} ${isSidebarCollapsed ? 'text-center' : ''}`}>
              {isSidebarCollapsed ? <BsFileEarmarkText /> : 'Donate'}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Gallery" className={`nav-link text-decoration-none ${isActive('/Gallery')} ${isSidebarCollapsed ? 'text-center' : ''}`}>
              {isSidebarCollapsed ? <BsFileEarmarkText /> : 'Gallery'}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/AdoptChild" className={`nav-link text-decoration-none ${isActive('/AdoptChild')} ${isSidebarCollapsed ? 'text-center' : ''}`}>
              {isSidebarCollapsed ? <BsFileEarmarkText /> : 'Adopt a child'}
            </Link>
          </li>

          {/* Add other sidebar links here as needed */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
