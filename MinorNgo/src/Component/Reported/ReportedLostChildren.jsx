import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container } from 'react-bootstrap';

const ReportedLostChildren = () => {
  const [lostChildren, setLostChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLostChildren = async () => {
      try {
        const response = await axios.get('http://localhost:3001/lost-children', { withCredentials: true });
        setLostChildren(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch lost children');
        setLoading(false);
      }
    };
    fetchLostChildren();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <h2 className="my-4 text-center">Lost Children Reported by You</h2>
      {lostChildren.length === 0 ? (
        <p className="text-center">No lost children reports found.</p>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead className="thead-dark">
            <tr>
              <th>Child Name</th>
              <th>Age</th>
              <th>Last Seen Location</th>
              <th>Description</th>
              <th>Reported On</th>
            </tr>
          </thead>
          <tbody>
            {lostChildren.map((child) => (
              <tr key={child._id}>
                <td>{child.childName}</td>
                <td>{child.age}</td>
                <td>{child.lastSeenLocation}</td>
                <td>{child.description || 'No description available'}</td>
                <td>{new Date(child.dateReported).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ReportedLostChildren;
