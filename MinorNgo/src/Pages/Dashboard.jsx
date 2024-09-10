import React from 'react';
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from '../Component/Navbar/CustomNavbar.jsx';
import MissingChildrenChart from '../Component/MissingChildrenChart/MissingChildrenChart.jsx';
import Piechart from '../Component/Piechart/Piechart.jsx';
import LatestNews from '../Component/LatestNews/LatestNews.jsx';

const Dashboard = () => {
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

      <div className="d-flex" style={{ marginTop: '60px', marginLeft: '250px' }}>
        {/* Content adjusted for sticky sidebar and navbar */}
        <div className="content p-4" style={{ width: '100%' }}>
          <MissingChildrenChart />

          {/* Two cards side by side below the line chart */}
          <div className="row mt-4">
            {/* Left side: Pie Chart */}
            <div className="col-md-6">
              <Piechart />
            </div>

            {/* Right side: Latest News */}
            <div className="col-md-6">
              <LatestNews />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
