import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const Piechart = () => {
  const [rescuesDone, setRescuesDone] = useState(0);
  const [rescuesRemaining, setRescuesRemaining] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/rescue-data'); // Replace with your actual API endpoint
        const data = await response.json();
        
        // Assuming API returns an object with `rescuesDone` and `rescuesRemaining` fields
        setRescuesDone(data.rescuesDone || 0);
        setRescuesRemaining(data.rescuesRemaining || 0);
      } catch (error) {
        console.error('Error fetching rescue data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Data for the pie chart
  const data = {
    labels: ['Rescues Done', 'Rescues Remaining'],
    datasets: [
      {
        label: 'Volunteer Rescues',
        data: [rescuesDone, rescuesRemaining], // Dynamic values from API
        backgroundColor: ['#36A2EB', '#FF6384'], // Colors for the chart
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  if (loading) {
    return <p>Loading chart data...</p>; // Display loading message while data is being fetched
  }

  return (
    <div className="m-4">
      <h4 className="text-center mb-4">Volunteer Rescues Overview</h4>
      <div style={{ width: '400px', margin: '0 auto' }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default Piechart;
