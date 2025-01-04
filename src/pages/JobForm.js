import React, { useState } from 'react';
import axios from 'axios';
import './JobForm.css';
import { useNavigate } from 'react-router-dom';
const JobForm = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    role: '',
    job_description: '',
    experience_required: '',
    job_posting_date: '',
    application_deadline: '',
    location: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:5000/jobform', formData);
      alert('Job posted successfully!');
      navigate('/jobform');

    } catch (error) {
      console.error('Error posting job:', error);
      alert('Failed to post the job.');
    }
  };

  return (
    <div className="job-form-container">
      <h1>Post a Job</h1>
      <form onSubmit={handleSubmit}>
        <label>Company Name:</label>
        <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} required />

        <label>Role:</label>
        <input type="text" name="role" value={formData.role} onChange={handleChange} required />

        <label>Job Description:</label>
        <textarea name="job_description" value={formData.job_description} onChange={handleChange} required />

        <label>Experience Required:</label>
        <input type="text" name="experience_required" value={formData.experience_required} onChange={handleChange} required />

        <label>Job Posting Date:</label>
        <input type="date" name="job_posting_date" value={formData.job_posting_date} onChange={handleChange} required />

        <label>Application Deadline:</label>
        <input type="date" name="application_deadline" value={formData.application_deadline} onChange={handleChange} required />

        <label>Location:</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default JobForm;
