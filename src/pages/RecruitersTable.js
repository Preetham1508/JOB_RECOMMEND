import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RecruitersTable.css';
function RecruiterTable() {
  const [recruiters, setRecruiters] = useState([]);

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const fetchRecruiters = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/recruiters');
      setRecruiters(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching recruiters:', error);
    }
  };

  const handleAccept = async (id) => {
    try {
        console.log("HIiiiiiiiiii");
      await axios.post(`http://127.0.0.1:5000/recruiters/${id}/accept`);
      fetchRecruiters(); // Refresh the list after accepting
    } catch (error) {
      console.error('Error accepting recruiter:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/recruiters/${id}`);
      fetchRecruiters(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error rejecting recruiter:', error);
    }
  };

  return (
    <div>
      <h1>Recruiters List</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Company Name</th>
            <th>Recruiter ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recruiters.map((recruiter) => (
            <tr key={recruiter._id}>
              <td>{recruiter.firstname} {recruiter.lastname}</td>
              <td>{recruiter.company_name}</td>
              <td>{recruiter.recruiter_id}</td>
              <td>
                <button onClick={() => handleAccept(recruiter._id)}>Accept</button>
                <button onClick={() => handleReject(recruiter._id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecruiterTable;
