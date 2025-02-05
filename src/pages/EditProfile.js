// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import './EditProfile.css';
// import { logincontext } from "../contexts/Logincontext";
// import { Navigate, useNavigate } from 'react-router-dom';

// const EditProfile = () => {
//     const [formData, setFormData] = useState({
//         photo: null,
//         gender: '',
//         dob: '',
//         contact: '',
//         address: '',
//         education: [],
//         companies: [],
//         skills: [],
//     });
//     const [currentuser, loginerror, UserloginStatus, Loginuser, Logoutuser, isUser, isRecruiter, isAdmin] = useContext(logincontext);
//     const navigate = useNavigate();
//     useEffect(() => {
//         // Fetch user profile data when component mounts
//         const fetchProfile = async () => {
//             try {
//                 const response = await axios.get('http://127.0.0.1:5000/profile', {
//                     params: { email: currentuser.email }
//                 });
//                 const profileData = response.data;
//                 // Populate form data with data from the database
//                 console.log(profielData);
//                 setFormData({
//                     photo: profileData.photo || null,
//                     gender: profileData.gender || '',
//                     dob: profileData.dob || '',
//                     contact: profileData.contact || '',
//                     address: profileData.address || '',
//                     education: profileData.education || [{ degree: '', institution: '', graduatedyear: '' }],
//                     companies: profileData.companies || [{ name: '', position: '', experience: '' }],
//                     skills: profileData.skills || [],
//                 });
//                 console.log(formData);
//             } catch (error) {
//                 console.error('Error fetching profile:', error);
//             }
//         };
//         if (UserloginStatus) {
//             fetchProfile();
//         }
//     }, [UserloginStatus, currentuser.email]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleEducationChange = (index, field, value) => {
//         const updatedEducation = [...formData.education];
//         updatedEducation[index][field] = value;
//         setFormData({ ...formData, education: updatedEducation });
//     };

//     const handleExperienceChange = (index, field, value) => {
//         const updatedCompanies = [...formData.companies];
//         updatedCompanies[index][field] = value;
//         setFormData({ ...formData, companies: updatedCompanies });
//     };

//     const handleAddEducation = () => {
//         setFormData({
//             ...formData,
//             education: [...formData.education, { degree: '', institution: '', graduatedyear: '' }]
//         });
//     };

//     const handleAddExperience = () => {
//         setFormData({
//             ...formData,
//             companies: [...formData.companies, { name: '', position: '', experience: '' }]
//         });
//     };

//     const handleFileChange = (e) => {
//         setFormData({ ...formData, photo: e.target.files[0] });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             console.log(formData);
//             const filteredData = Object.keys(formData)
//             .filter(key => formData[key] !== null && formData[key] !== '')
//             .reduce((obj, key) => {
//                 obj[key] = formData[key];
//                 return obj;
//             }, {});
//             console.log(filteredData);
//             const response = await axios.post('http://127.0.0.1:5000/editprofile', {
//                 email: currentuser.email,
//                 data: filteredData
//             });
//             console.log('Profile updated successfully:', response.data);
//         } catch (error) {
//             console.error('Error updating profile:', error);
//         }
//         alert("Saved changes succesfully!")
//         navigate("/profile");
//     };

//     return (
//         <div className="edit-profile-page">
//             <h1>Edit Profile</h1>
//             <form onSubmit={handleSubmit} className="edit-profile-form">
//                 <div className="form-row">
//                     <label>
//                         Profile Photo:
//                         <input type="file" name="photo" onChange={handleFileChange} />
//                     </label>
//                     <label>
//                         Name:
//                         <p>{currentuser.firstname + " " + currentuser.lastname}</p>
//                     </label>
//                 </div>
//                 <div className="form-row">
//                     <label>
//                         Gender:
//                         <select name="gender" value={formData.gender} onChange={handleChange} required>
//                             <option value="">Select Gender</option>
//                             <option value="male">Male</option>
//                             <option value="female">Female</option>
//                             <option value="other">Other</option>
//                         </select>
//                     </label>
//                     <label>
//                         DOB:
//                         <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
//                     </label>
//                 </div>
//                 <div className="form-row">
//                     <label>
//                         Contact No:
//                         <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required />
//                     </label>
//                     <label>
//                         Address:
//                         <textarea name="address" value={formData.address} onChange={handleChange} />
//                     </label>
//                 </div>

//                 <div className="form-section">
//                     <h3>Education</h3>
//                     {formData.education.map((edu, index) => (
//                         <div className="form-row" key={index}>
//                             <input
//                                 type="text"
//                                 placeholder="Degree"
//                                 value={edu.degree}
//                                 onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
//                                 required
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Institution"
//                                 value={edu.institution}
//                                 onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
//                                 required
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Graduation Year"
//                                 value={edu.graduatedyear}
//                                 onChange={(e) => handleEducationChange(index, 'graduatedyear', e.target.value)}
//                                 required
//                             />
//                         </div>
//                     ))}
//                     <button type="button" onClick={handleAddEducation}>Add Education</button>
//                 </div>
//                 <div className="form-section">
//                     <h3>Experience</h3>
//                     {formData.companies.map((company, index) => (
//                         <div className="form-row" key={index}>
//                             <input
//                                 type="text"
//                                 placeholder="Company Name"
//                                 value={company.name}
//                                 onChange={(e) => handleExperienceChange(index, 'name', e.target.value)}
//                                 required
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Position"
//                                 value={company.position}
//                                 onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
//                                 required
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Experience (Years)"
//                                 value={company.experience}
//                                 onChange={(e) => handleExperienceChange(index, 'experience', e.target.value)}
//                                 required
//                             />
//                         </div>
//                     ))}
//                     <button type="button" onClick={handleAddExperience}>Add Experience</button>
//                 </div>
//                 <div className="form-row">
//                     <label>
//                         Skills (Comma-separated):
//                         <input
//                             type="text"
//                             name="skills"
//                             value={formData.skills.join(', ')}
//                             onChange={(e) => handleChange({ target: { name: 'skills', value: e.target.value.split(',').map(skill => skill.trim()) } })}
//                         />
//                     </label>
//                 </div>
//                 <button type="submit" className="save-button">Save</button>
//             </form>
//         </div>
//     );
// };

// export default EditProfile;




import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './EditProfile.css';
import { logincontext } from "../contexts/Logincontext";
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const [formData, setFormData] = useState({
        photo: null,
        gender: '',
        dob: '',
        contact: '',
        address: '',
        education: [{ degree: '', institution: '', graduatedyear: '' }],
        companies: [{ name: '', position: '', experience: '' }],
        skills: [],
    });
    const [currentuser, loginerror, UserloginStatus, Loginuser, Logoutuser, isUser, isRecruiter, isAdmin] = useContext(logincontext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // const response = await axios.get('http://127.0.0.1:5000/profile', 
                const response = await axios.get('http:/localhost:5000/profile', {
                    params: { email: currentuser.email }
                });
                const profileData = response.data;
                setFormData({
                    photo: profileData.photo || null,
                    gender: profileData.gender || '',
                    dob: profileData.dob || '',
                    contact: profileData.contact || '',
                    address: profileData.address || '',
                    education: profileData.education || [{ degree: '', institution: '', graduatedyear: '' }],
                    companies: profileData.companies || [{ name: '', position: '', experience: '' }],
                    skills: profileData.skills || [],
                });
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        if (UserloginStatus) {
            fetchProfile();
        }
    }, [UserloginStatus, currentuser.email]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({ ...formData, photo: reader.result });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleEducationChange = (index, field, value) => {
        const updatedEducation = [...formData.education];
        updatedEducation[index][field] = value;
        setFormData({ ...formData, education: updatedEducation });
    };

    const handleExperienceChange = (index, field, value) => {
        const updatedCompanies = [...formData.companies];
        updatedCompanies[index][field] = value;
        setFormData({ ...formData, companies: updatedCompanies });
    };

    const handleAddEducation = () => {
        setFormData({
            ...formData,
            education: [...formData.education, { degree: '', institution: '', graduatedyear: '' }]
        });
    };

    const handleAddExperience = () => {
        setFormData({
            ...formData,
            companies: [...formData.companies, { name: '', position: '', experience: '' }]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const filteredData = Object.keys(formData)
                .filter(key => formData[key] !== null && formData[key] !== '')
                .reduce((obj, key) => {
                    obj[key] = formData[key];
                    return obj;
                }, {});

            await axios.post('http://localhost:5000/editprofile', {
                email: currentuser.email,
                data: filteredData
            });

            alert("Saved changes successfully!");
            navigate("/profile");
        } catch (error) {
            console.error('Error updating profile:', error);
            alert("Failed to save changes. Please try again.");
        }
    };

    return (
        <div className="edit-profile-page">
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit} className="edit-profile-form">
                <div className="form-row">
                    <label>
                        Profile Photo:
                        <input type="file" name="photo" onChange={handleFileChange} />
                    </label>
                    <label>
                        Name:
                        <p>{currentuser.firstname + " " + currentuser.lastname}</p>
                    </label>
                </div>

                <div className="form-row">
                    <label>
                        Gender:
                        <select name="gender" value={formData.gender} onChange={handleChange} >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                    <label>
                        DOB:
                        <input type="date" name="dob" value={formData.dob} onChange={handleChange}  />
                    </label>
                </div>

                <div className="form-row">
                    <label>
                        Contact No:
                        <input type="tel" name="contact" value={formData.contact} onChange={handleChange} />
                    </label>
                    <label>
                        Address:
                        <textarea name="address" value={formData.address} onChange={handleChange} />
                    </label>
                </div>

                <div className="form-section">
                    <h3>Education</h3>
                    {formData.education.map((edu, index) => (
                        <div className="form-row" key={index}>
                            <input
                                type="text"
                                placeholder="Degree"
                                value={edu.degree}
                                onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Institution"
                                value={edu.institution}
                                onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Graduation Year"
                                value={edu.graduatedyear}
                                onChange={(e) => handleEducationChange(index, 'graduatedyear', e.target.value)}
                            />
                        </div>
                    ))}
                    <button type="button" onClick={handleAddEducation}>Add Education</button>
                </div>

                <div className="form-section">
                    <h3>Experience</h3>
                    {formData.companies.map((company, index) => (
                        <div className="form-row" key={index}>
                            <input
                                type="text"
                                placeholder="Company Name"
                                value={company.name}
                                onChange={(e) => handleExperienceChange(index, 'name', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Position"
                                value={company.position}
                                onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Experience (Years)"
                                value={company.experience}
                                onChange={(e) => handleExperienceChange(index, 'experience', e.target.value)}
                            />
                        </div>
                    ))}
                    <button type="button" onClick={handleAddExperience}>Add Experience</button>
                </div>

                <div className="form-row">
                    <label>
                        Skills (Comma-separated):
                        <input
                            type="text"
                            name="skills"
                            value={formData.skills.join(', ')}
                            onChange={(e) => handleChange({ target: { name: 'skills', value: e.target.value.split(',').map(skill => skill.trim()) } })}
                        />
                    </label>
                </div>

                <button type="submit" className="save-button">Save</button>
            </form>
        </div>
    );
};

export default EditProfile;
