import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UnadoptedChildrenTable = () => {
  const [children, setChildren] = useState([]);

  useEffect(() => {
    // Fetch unadopted children
    const fetchUnadoptedChildren = async () => {
      try {
        const response = await axios.get('http://localhost:3001/unadopted-children');
        setChildren(response.data);
      } catch (error) {
        console.error('Error fetching unadopted children:', error);
      }
    };

    fetchUnadoptedChildren();
  }, []);

  return (
    <div>
      <h2>Unadopted Children</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Last Seen</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {children.map(child => (
            <tr key={child._id}>
              <td>{child.childName}</td>
              <td>{child.age}</td>
              <td>{child.gender}</td>
              <td>{child.lastSeen}</td>
              <td>{child.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UnadoptedChildrenTable;
