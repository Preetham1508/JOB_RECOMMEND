// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Profile.css';
// import { logincontext } from "../contexts/Logincontext";
// import { Link } from 'react-router-dom';
// import { useContext } from "react";

// const Profile = () => {
//   const [currentuser, , UserloginStatus] = useContext(logincontext);
//   const [profileData, setProfileData] = useState(null);

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:5000/profile', {
//           params: { email: currentuser.email, role: currentuser.role },
//         });
//         setProfileData(response.data.data);
//       } catch (error) {
//         console.error('Error fetching profile data:', error);
//       }
//     };

//     if (UserloginStatus) {
//       fetchProfileData();
//     }
//   }, [UserloginStatus, currentuser.email]);

//   return (
//     <div className="profile-page">
//       <div className="profile-header">
//         <div className="profile-header-left">
//           <img className="profile-avatar" alt="Profile Avatar" src="/ellipse-25@2x.png" />
//           <Link to="/editprofile">
//             <button className="edit-button">Edit Profile</button>
//           </Link>
//         </div>
//         <div className="profile-details">
//           <h2 className="section-title">Profile Details</h2>
//           {profileData ? (
//             <>
//               <div className="detail-item">
//                 <strong>Name:</strong> <span className="detail-value">{profileData.firstname} {profileData.lastname}</span>
//               </div>
//               <div className="detail-item">
//                 <strong>Email ID:</strong> <span className="detail-value">{profileData.email}</span>
//               </div>
//             </>
//           ) : (
//             <p>Loading profile data...</p>
//           )}
//         </div>
//       </div>

//       {profileData && (
//         <div className="profile-main">
//           {/* Performance Analysis Section */}
//           <div className="profile-performance">
//             <h2 className="section-title">Performance Analysis</h2>
//             <div className="performance-stats">
//               <div className="stat-item">
//                 <p>Connections</p>
//                 <h3>1716</h3>
//               </div>
//               <div className="stat-item">
//                 <p>New Suggestions</p>
//                 <h3>12</h3>
//               </div>
//               <div className="stat-item">
//                 <p>No of jobs applied</p>
//                 <h3>45</h3>
//               </div>
//               <div className="stat-item">
//                 <p>No of offers received</p>
//                 <h3>3</h3>
//               </div>
//             </div>
//             <div className="performance-graph">
//               {/* Placeholder for performance graph */}
//               <p>Graph Placeholder</p>
//             </div>
//           </div>

//           {/* Education Section */}
//           <div className="profile-section">
//             <h2 className="section-title">Education</h2>
//             {profileData.education.map((edu, index) => (
//               <div key={index} className="detail-item">
//                 <strong>{edu.degree}</strong>, {edu.institution} ({edu.graduatedyear})
//               </div>
//             ))}
//           </div>

//           {/* Work Experience Section */}
//           <div className="profile-section">
//             <h2 className="section-title">Work Experience</h2>
//             {profileData.companies.map((company, index) => (
//               <div key={index} className="detail-item">
//                 <strong>{company.position}</strong> at {company.name} - {company.experience} years
//               </div>
//             ))}
//           </div>

//           {/* Skills Section */}
//           <div className="profile-section">
//             <h2 className="section-title">Skills</h2>
//             <div className="detail-item">
//               <span className="detail-value">{profileData.skills.join(', ')}</span>
//             </div>
//           </div>

//           {/* Location Section */}
//           <div className="profile-section">
//             <h2 className="section-title">Location</h2>
//             <div className="detail-item">
//               <span className="detail-value">{profileData.location.address}</span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Profile.css';
// import { logincontext } from "../contexts/Logincontext";
// import { Link } from 'react-router-dom';
// import { useContext } from "react";

// const Profile = () => {
//   const [currentuser, , UserloginStatus] = useContext(logincontext);
//   const [profileData, setProfileData] = useState(null);

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:5000/profile', {
//           params: { email: currentuser.email, role: currentuser.role },
//         });
//         setProfileData(response.data.data);
//       } catch (error) {
//         console.error('Error fetching profile data:', error);
//       }
//     };

//     if (UserloginStatus) {
//       fetchProfileData();
//     }
//   }, [UserloginStatus, currentuser.email]);

//   return (
//     <div className="profile-page">
//       <div className="profile-header">
//         <div className="profile-header-left">
//           <img className="profile-avatar" alt="Profile Avatar" src="/ellipse-25@2x.png" />
//           <Link to="/editprofile">
//             <button className="edit-button">Edit Profile</button>
//           </Link>
//         </div>
//         <div className="profile-details">
//           <h2 className="section-title">Profile Details</h2>
//           {profileData ? (
//             <>
//               {profileData.firstname && profileData.lastname && (
//                 <div className="detail-item">
//                   <strong>Name:</strong> <span className="detail-value">{profileData.firstname} {profileData.lastname}</span>
//                 </div>
//               )}
//               {profileData.email && (
//                 <div className="detail-item">
//                   <strong>Email ID:</strong> <span className="detail-value">{profileData.email}</span>
//                 </div>
//               )}
//             </>
//           ) : (
//             <p>Loading profile data...</p>
//           )}
//         </div>
//       </div>

//       {profileData && (
//         <div className="profile-main">
//           {/* Performance Analysis Section */}
//           <div className="profile-performance">
//             <h2 className="section-title">Performance Analysis</h2>
//             <div className="performance-stats">
//               <div className="stat-item">
//                 <p>Connections</p>
//                 <h3>1716</h3>
//               </div>
//               <div className="stat-item">
//                 <p>New Suggestions</p>
//                 <h3>12</h3>
//               </div>
//               <div className="stat-item">
//                 <p>No of jobs applied</p>
//                 <h3>45</h3>
//               </div>
//               <div className="stat-item">
//                 <p>No of offers received</p>
//                 <h3>3</h3>
//               </div>
//             </div>
//             <div className="performance-graph">
//               {/* Placeholder for performance graph */}
//               <p>Graph Placeholder</p>
//             </div>
//           </div>

//           {/* Education Section */}
//           {profileData.education && profileData.education.length > 0 && (
//             <div className="profile-section">
//               <h2 className="section-title">Education</h2>
//               {profileData.education.map((edu, index) => (
//                 <div key={index} className="detail-item">
//                   <strong>{edu.degree}</strong>, {edu.institution} ({edu.graduatedyear})
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Work Experience Section */}
//           {profileData.companies && profileData.companies.length > 0 && (
//             <div className="profile-section">
//               <h2 className="section-title">Work Experience</h2>
//               {profileData.companies.map((company, index) => (
//                 <div key={index} className="detail-item">
//                   <strong>{company.position}</strong> at {company.name} - {company.experience} years
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Skills Section */}
//           {profileData.skills && profileData.skills.length > 0 && (
//             <div className="profile-section">
//               <h2 className="section-title">Skills</h2>
//               <div className="detail-item">
//                 <span className="detail-value">{profileData.skills.join(', ')}</span>
//               </div>
//             </div>
//           )}

//           {/* Location Section */}
//           {profileData.location && profileData.location.address && (
//             <div className="profile-section">
//               <h2 className="section-title">Location</h2>
//               <div className="detail-item">
//                 <span className="detail-value">{profileData.location.address}</span>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;



// Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import { logincontext } from "../contexts/Logincontext";
import { Link } from 'react-router-dom';
import { useContext } from "react";

const Profile = () => {
  const [currentuser, , UserloginStatus] = useContext(logincontext);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/profile', {
          params: { email: currentuser.email, role: currentuser.role },
        });
        setProfileData(response.data.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    if (UserloginStatus) {
      fetchProfileData();
    }
  }, [UserloginStatus, currentuser.email]);

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-header-left">
          {profileData && profileData.photo ? (
            <img
              className="profile-avatar"
              alt="Profile Avatar"
              src={profileData.photo}
            />
          ) : (
            <img
              className="profile-avatar"
              alt="Default Profile Avatar"
              src="/ellipse-25@2x.png"
            />
          )}
          <Link to="/editprofile">
            <button className="edit-button">Edit Profile</button>
          </Link>
        </div>
        <div className="profile-details">
          <h2 className="section-title">Profile Details</h2>
          {profileData ? (
            <>
              {profileData.firstname && profileData.lastname && (
                <div className="detail-item">
                  <strong>Name:</strong>{' '}
                  <span className="detail-value">
                    {profileData.firstname} {profileData.lastname}
                  </span>
                </div>
              )}
              {profileData.email && (
                <div className="detail-item">
                  <strong>Email ID:</strong>{' '}
                  <span className="detail-value">{profileData.email}</span>
                </div>
              )}
            </>
          ) : (
            <p>Loading profile data...</p>
          )}
        </div>
      </div>

      {profileData && (
        <div className="profile-main">
          {/* <div className="profile-performance">
            <h2 className="section-title">Performance Analysis</h2>
            <div className="performance-stats">
              <div className="stat-item">
                <p>Connections</p>
                <h3>1716</h3>
              </div>
              <div className="stat-item">
                <p>New Suggestions</p>
                <h3>12</h3>
              </div>
              <div className="stat-item">
                <p>No of jobs applied</p>
                <h3>45</h3>
              </div>
              <div className="stat-item">
                <p>No of offers received</p>
                <h3>3</h3>
              </div>
            </div>
            <div className="performance-graph">
              <p>Graph Placeholder</p>
            </div>
          </div> */}

          {/* Education Section */}
          {profileData.education && profileData.education.length > 0 && (
            <div className="profile-section">
              <h2 className="section-title">Education</h2>
              {profileData.education.map((edu, index) => (
                <div key={index} className="detail-item">
                  <strong>{edu.degree}</strong>, {edu.institution} ({edu.graduatedyear})
                </div>
              ))}
            </div>
          )}

          {/* Work Experience Section */}
          {profileData.companies && profileData.companies.length > 0 && (
            <div className="profile-section">
              <h2 className="section-title">Work Experience</h2>
              {profileData.companies.map((company, index) => (
                <div key={index} className="detail-item">
                  <strong>{company.position}</strong> at {company.name} - {company.experience} years
                </div>
              ))}
            </div>
          )}

          {/* Skills Section */}
          {profileData.skills && profileData.skills.length > 0 && (
            <div className="profile-section">
              <h2 className="section-title">Skills</h2>
              <div className="detail-item">
                <span className="detail-value">{profileData.skills.join(', ')}</span>
              </div>
            </div>
          )}

          {/* Location Section */}
          {profileData.location && profileData.location.address && (
            <div className="profile-section">
              <h2 className="section-title">Location</h2>
              <div className="detail-item">
                <span className="detail-value">{profileData.location.address}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;


