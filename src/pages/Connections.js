import React, { useEffect, useState, useContext } from 'react';
import { logincontext } from "../contexts/Logincontext";
import axios from 'axios';
import "./Connections.css";

const Connections = () => {
  const [currentuser] = useContext(logincontext);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null); // Track the index of the expanded card

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/usersrec', {
          params: { email: currentuser.email }
        });
        const formattedData = response.data.map(profile => ({
          ...profile,
          _id: profile._id?.$oid || profile._id,
          education: Array.isArray(profile.education) ? profile.education.map(edu => ({
            ...edu,
            graduatedyear: edu.graduatedyear?.$numberInt || edu.graduatedyear
          })) : [],
          companies: Array.isArray(profile.companies) ? profile.companies.map(company => ({
            ...company,
            experience: company.experience?.$numberInt || company.experience
          })) : []
        }));
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="connections-container">
      {/* Heading for the connections page */}
      <h1 className="connections-heading">Recommended Connections</h1>
      
      <div className="profile-cards">
        {profiles && profiles.length > 0 ? profiles.map((profile, index) => (
          <div key={profile._id} className="profile-card" onClick={() => toggleDetails(index)}>
            <h2>{profile.firstname} {profile.lastname}</h2>
            
            {/* Education Section */}
            {profile.education.length > 0 && (
              <div>
                <h3>Education:</h3>
                <ul>
                  {profile.education.slice(0, 1).map((edu, index) => (
                    <li key={index}>
                      {edu.degree} from {edu.institution} (Graduated: {edu.graduatedyear})
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Experience Section - Show only when expanded */}
            {expandedIndex === index && (
              <>
                {profile.companies.length > 0 && (
                  <div>
                    <h3>Experience:</h3>
                    <ul>
                      {profile.companies.map((company, index) => (
                        <li key={index}>
                          {company.name} as {company.position} for {company.experience} years
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Skills Section */}
                {profile.skills && profile.skills.length > 0 && (
                  <div>
                    <h3>Skills:</h3>
                    <p>{profile.skills.join(', ')}</p>
                  </div>
                )}

                {/* Location Section */}
                {profile.location && profile.location.address && (
                  <div>
                    <h3>Location:</h3>
                    <p>{profile.location.address} (Lat: {profile.location.lat}, Lon: {profile.location.lon})</p>
                  </div>
                )}
              </>
            )}
          </div>
        )) : <div>No profiles found.</div>}
      </div>
    </div>
  );
};

export default Connections;
