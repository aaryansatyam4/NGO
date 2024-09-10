import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const Piechart = () => {
  // Data for the pie chart
  const data = {
    labels: ['Rescues Done', 'Rescues Remaining'],
    datasets: [
      {
        label: 'Volunteer Rescues',
        data: [5, 7], // Random values for rescues done and remaining
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
