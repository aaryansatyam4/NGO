import React from 'react';
import { Card } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function MissingChildrenChart() {
  // Data for the chart
  const data = {
    labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: 'Missing Children per Year',
        data: [35000, 42000, 39000, 46000, 47000, 41000, 43000, 45000],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Found Children per Year',
        data: [15000, 20000, 18000, 24000, 23000, 19000, 21000, 25000],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Adoptions per Year',
        data: [5000, 6000, 5500, 7000, 7500, 8000, 8500, 9000],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
      {
        label: 'NGO Volunteers Joined per Year',
        data: [200, 250, 300, 400, 450, 500, 600, 700],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Reported Cases per Year',
        data: [40000, 45000, 42000, 48000, 49000, 46000, 47000, 50000],
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Successful Rescues per Year',
        data: [20000, 22000, 21000, 24000, 26000, 23000, 25000, 27000],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensures the chart adjusts dynamically
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Multiple Child Welfare Statistics in India (2016-2023)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container">
      <Card className="m-4 p-4 shadow-lg">
        <Card.Body>
          <Card.Title className="text-center">Child Welfare Statistics in India</Card.Title>
          <div style={{ position: 'relative', height: '60vh', width: '100%' }}>
            <Line data={data} options={options} />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default MissingChildrenChart;
