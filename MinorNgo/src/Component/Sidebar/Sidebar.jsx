import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBars } from 'react-icons/fa';
import { BsPerson, BsFileEarmarkText, BsPersonPlus, BsCalendar, BsCurrencyDollar, BsImages, BsHeart } from 'react-icons/bs';

const Sidebar = () => {
  // Dropdown state for "Donate"
  const [isDonateOpen, setIsDonateOpen] = useState(false);

  // Sidebar collapse state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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
          style={{ marginRight: '10px' }}  // Space between hamburger and heading
        >
          <FaBars />
        </button>
        <h4 className="m-0">NGO</h4>  {/* NGO Heading */}
      </div>

      {/* Sidebar */}
      <div className={`d-flex flex-column p-3 bg-light ${isSidebarCollapsed ? 'collapsed' : ''}`} style={{ 
        width: isSidebarCollapsed ? '80px' : '250px', 
        height: '100vh', 
        transition: 'width 0.3s', 
        position: 'fixed', // Make sidebar sticky
        top: '0',
        left: '0',
        zIndex: '999',
        paddingTop: '60px' // To prevent overlapping with the hamburger and heading
      }}>
        <ul className="nav nav-pills flex-column mb-auto">
          {/* Be A Volunteer */}
          <li className="nav-item" style={{ marginTop: '50px' }}>
            <a href="#" className={`nav-link active text-decoration-none ${isSidebarCollapsed ? 'text-center' : ''}`}>
              {isSidebarCollapsed ? <BsPerson /> : 'Be A Volunteer'}
            </a>
          </li>

          {/* Report Lost Child */}
          <li className="nav-item">
            <a href="#" className={`nav-link text-dark text-decoration-none ${isSidebarCollapsed ? 'text-center' : ''}`}>
              {isSidebarCollapsed ? <BsFileEarmarkText /> : 'Report Lost Child'}
            </a>
          </li>

          {/* Add Lost Child */}
          <li className="nav-item">
            <a href="#" className={`nav-link text-dark text-decoration-none ${isSidebarCollapsed ? 'text-center' : ''}`}>
              {isSidebarCollapsed ? <BsPersonPlus /> : 'Add Lost Child'}
            </a>
          </li>

          {/* Upcoming Event */}
          <li className="nav-item">
            <a href="#" className={`nav-link text-dark text-decoration-none ${isSidebarCollapsed ? 'text-center' : ''}`}>
              {isSidebarCollapsed ? <BsCalendar /> : 'Upcoming Event'}
            </a>
          </li>

          {/* Donate with Dropdown */}
          <li className="nav-item">
            <a
              href="#"
              className={`nav-link dropdown-toggle text-dark ${isSidebarCollapsed ? 'text-center' : ''}`}
              id="donateDropdown"
              role="button"
              aria-expanded={isDonateOpen}
              onClick={() => setIsDonateOpen(!isDonateOpen)}
            >
              {isSidebarCollapsed ? <BsCurrencyDollar /> : 'Donate'}
            </a>
            {isDonateOpen && !isSidebarCollapsed && (
              <ul className="dropdown-menu show">
                <li><a className="dropdown-item" href="#">Track Donation</a></li>
                <li><a className="dropdown-item" href="#">Donate</a></li>
              </ul>
            )}
          </li>

          {/* Gallery */}
          <li className="nav-item">
            <a href="#" className={`nav-link text-dark text-decoration-none ${isSidebarCollapsed ? 'text-center' : ''}`}>
              {isSidebarCollapsed ? <BsImages /> : 'Gallery'}
            </a>
          </li>

          {/* Adopt A Child */}
          <li className="nav-item">
            <a href="#" className={`nav-link text-dark text-decoration-none ${isSidebarCollapsed ? 'text-center' : ''}`}>
              {isSidebarCollapsed ? <BsHeart /> : 'Adopt A Child'}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
