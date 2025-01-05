import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/authContext';
const SubmitComplaint = () => {
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      console.log('Submitting complaint:', { employeeId: user._id, description });
      const response = await axios.post('http://localhost:5000/api/complaints/submit', {
        employeeId: user._id,
        description
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log('Server response:', response.data);
      if (response.data.success) {
        setSuccess('Complaint submitted successfully');
        setDescription('');
      } else {
        setError('Failed to submit complaint: ' + (response.data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error submitting complaint:', error.response?.data || error.message);
      setError('Error submitting complaint: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Submit a Complaint</h2>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2">Description (max 150 words)</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={150}
            rows={4}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit Complaint</button>
      </form>
    </div>
  );
};

export default SubmitComplaint;