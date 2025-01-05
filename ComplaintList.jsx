import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/complaints', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setComplaints(response.data.complaints);
      }
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/complaints/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          fetchComplaints();
        }
      } catch (error) {
        console.error('Error deleting complaint:', error);
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Complaints</h2>
      <ul>
        {complaints.map((complaint) => (
          <li key={complaint._id} className="mb-4 p-4 border rounded">
            <p><strong>Employee:</strong> {complaint.employeeName}</p>
            <p><strong>Description:</strong> {complaint.description}</p>
            <p><strong>Date:</strong> {new Date(complaint.createdAt).toLocaleString()}</p>
            <button
              onClick={() => handleDelete(complaint._id)}
              className="mt-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComplaintList;