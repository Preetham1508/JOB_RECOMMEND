import React, { useEffect, useState, useContext } from 'react';
import { logincontext } from "../contexts/Logincontext";
import axios from 'axios';
import "./Connections.css";

const Jobs = () => {
  const [currentuser] = useContext(logincontext);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null); // Track the index of the expanded card

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/jobrec', {
          params: { email: currentuser.email }
        });
        const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
        console.log("Raw response data:", response.data);
        const formattedData = data.map(profile => ({
          companyName: profile.company_name,
          role: profile.role,
          jobDescription: profile.job_description,
          experienceRequired: profile.experience_required,
          jobPostingDate: profile.job_posting_date,
          applicationDeadline: profile.application_deadline,
          location: profile.location,
        }));
        console.log("Formatted profiles:", formattedData);
        setProfiles(formattedData);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [currentuser.email]);

  const toggleDetails = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index); // Toggle the expanded index
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading job profiles...</p>
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  return (
    <div className="connections-container">
      {/* Heading for the connections page */}
      <h1 className="connections-heading">Recommended Jobs</h1>
    <div className="profile-cards">
      {profiles && profiles.length > 0 ? profiles.map((profile, index) => (
        <div key={profile._id} className="profile-card" onClick={() => toggleDetails(index)}>
          <h2>{profile.companyName}</h2>
          <p><strong>Role:</strong> {profile.role}</p>
          <p><strong>Location:</strong> {profile.location}</p>
          
          {/* Display only brief information initially */}
          <p><strong>Experience Required:</strong> {profile.experienceRequired}</p>
          
          {/* Expand to show full job details when clicked */}
          {expandedIndex === index && (
            <>
              <div>
                <h3>Job Description:</h3>
                <p>{profile.jobDescription}</p>
              </div>

              <div>
                <p><strong>Job Posting Date:</strong> {profile.jobPostingDate}</p>
                <p><strong>Application Deadline:</strong> {profile.applicationDeadline}</p>
              </div>
            </>
          )}
        </div>
      )) : <div>No profiles found.</div>}
    </div>
    </div>
  );
};

export default Jobs;
