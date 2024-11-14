import React, { useEffect, useState } from 'react';
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from '../Component/Navbar/CustomNavbar.jsx';
import MissingChildrenChart from '../Component/MissingChildrenChart/MissingChildrenChart.jsx';
import Piechart from '../Component/Piechart/Piechart.jsx';
import LatestNews from '../Component/LatestNews/LatestNews.jsx';

const PoliceDashboard = () => {
  const [children, setChildren] = useState([]);

  useEffect(() => {
    // Fetch children whose parents haven't been found and who are not yet adopted
    fetch('http://localhost:3001/all-lost-children')
      .then(response => response.json())
      .then(data => {
        const eligibleChildren = data.filter(child => !child.founded && !child.adopted);
        setChildren(eligibleChildren);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      Police dashboard

      {/* Sticky Sidebar */}
      <div style={{ position: 'fixed', top: '0', left: '0', zIndex: 2, height: '100vh', width: '250px' }}>
        <Sidebar />
      </div>

      {/* Sticky Navbar */}
      <div style={{ position: 'fixed', top: '0', left: '250px', right: '0', zIndex: 1, height: '60px' }}>
        <Navbar />
      </div>

      <div className="d-flex" style={{ marginTop: '60px', marginLeft: '250px' }}>
        <div className="content p-4" style={{ width: '100%' }}>
          <MissingChildrenChart />

          <div className="row mt-4">
            <div className="col-md-6">
              <Piechart />
            </div>
            <div className="col-md-6">
              <LatestNews />
            </div>
          </div>

          {/* Table of Eligible Children */}
          <h3 className="mt-5">Children Awaiting Adoption</h3>
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Last Seen Location</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {children.length > 0 ? (
                children.map((child, index) => (
                  <tr key={index}>
                    <td>{child.childName}</td>
                    <td>{child.age}</td>
                    <td>{child.gender}</td>
                    <td>{child.lastSeenLocation}</td>
                    <td>{child.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No children available for adoption</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PoliceDashboard;
