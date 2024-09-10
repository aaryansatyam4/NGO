import React, { useState } from 'react';
import { Card, Table, Pagination, DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const LatestNews = () => {
  // Sample data: array of missing children details
  const missingChildrenData = [
    { name: 'John Doe', missingDate: '2023-08-01', location: 'New Delhi', lastNews: 'Found in a nearby city' },
    { name: 'Jane Smith', missingDate: '2023-07-15', location: 'Mumbai', lastNews: 'No new updates' },
    { name: 'Michael Brown', missingDate: '2023-06-10', location: 'Kolkata', lastNews: 'Search operations expanded' },
    { name: 'Emily Johnson', missingDate: '2023-08-05', location: 'Chennai', lastNews: 'Witness reported sighting' },
    { name: 'Daniel Williams', missingDate: '2023-05-25', location: 'Bangalore', lastNews: 'Still missing' },
    { name: 'Olivia Davis', missingDate: '2023-04-30', location: 'Hyderabad', lastNews: 'Under investigation' },
    { name: 'Sophia Wilson', missingDate: '2023-03-12', location: 'Pune', lastNews: 'Leads in progress' },
    { name: 'Liam Garcia', missingDate: '2023-07-25', location: 'Ahmedabad', lastNews: 'New search area' },
    { name: 'Lucas Martinez', missingDate: '2023-02-10', location: 'Surat', lastNews: 'Possible sighting' },
    { name: 'Ella Rodriguez', missingDate: '2023-01-20', location: 'Jaipur', lastNews: 'Awaiting new leads' },
    { name: 'Mia Hernandez', missingDate: '2023-09-01', location: 'Lucknow', lastNews: 'Lead from a witness' },
    { name: 'James Gonzalez', missingDate: '2023-06-01', location: 'Kanpur', lastNews: 'No new updates' },
    { name: 'Harper Lopez', missingDate: '2023-07-01', location: 'Nagpur', lastNews: 'Search team deployed' },
    { name: 'Henry Patel', missingDate: '2023-05-15', location: 'Indore', lastNews: 'No new updates' },
    { name: 'Grace Lee', missingDate: '2023-08-12', location: 'Thane', lastNews: 'New information surfaced' },
    { name: 'Aiden King', missingDate: '2023-09-10', location: 'Bhopal', lastNews: 'No new updates' },
    { name: 'Chloe Walker', missingDate: '2023-08-20', location: 'Agra', lastNews: 'Reported sighting' },
    { name: 'Samuel Young', missingDate: '2023-06-20', location: 'Varanasi', lastNews: 'Leads pursued' },
    { name: 'Zoe Scott', missingDate: '2023-07-05', location: 'Patna', lastNews: 'Search team deployed' },
    { name: 'David Adams', missingDate: '2023-05-02', location: 'Vijayawada', lastNews: 'No new updates' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Constants for pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(missingChildrenData.length / itemsPerPage);

  // Sorting functionality
  const sortedData = [...missingChildrenData].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Get paginated data
  const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle sorting change
  const handleSort = (key) => {
    setSortKey(key);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <Card className="m-4 p-4 shadow-lg">
      <Card.Body>
        <Card.Title className="text-center">Missing Children Information</Card.Title>

        {/* Sorting Dropdown */}
        <DropdownButton id="dropdown-sort" title={`Sort by: ${sortKey} (${sortOrder})`} className="mb-3">
          <Dropdown.Item onClick={() => handleSort('name')}>Sort by Name</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSort('missingDate')}>Sort by Missing Date</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSort('location')}>Sort by Location</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSort('lastNews')}>Sort by Last News</Dropdown.Item>
        </DropdownButton>

        {/* Table of missing children */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Missing Date</th>
              <th>Location</th>
              <th>Last News</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((child, index) => (
              <tr key={index}>
                <td>{child.name}</td>
                <td>{child.missingDate}</td>
                <td>{child.location}</td>
                <td>{child.lastNews}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination */}
        <Pagination>
          {[...Array(totalPages).keys()].map((page) => (
            <Pagination.Item
              key={page + 1}
              active={page + 1 === currentPage}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Card.Body>
    </Card>
  );
};

export default LatestNews;
