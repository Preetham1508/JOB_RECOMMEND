// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// import "./SIGNUP.css";

// const SIGNUP = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     first_name: '',
//     last_name: '',
//     email: '',
//     password: '',
//     confirm_password: '',
//     role: 'user',
//     company_name: '',
//     id: '',
//     education: [{ degree: '', institution: '', graduated_year: '' }],
//     companies: [{ name: '', position: '', experience: '' }],
//     skills: [''],
//     location: { lat: '', lon: '', address: '' }
//   });
//   const [errors, setErrors] = useState({});

//   const validateField = (field, value) => {
//     let error = '';
//     switch (field) {
//       case 'first_name':
//       case 'last_name':
//         if (!value) error = 'This field is required';
//         else if (!/^[a-zA-Z]+$/.test(value)) error = 'Name must contain only alphabets';
//         break;
//       case 'email':
//         if (!value) error = 'This field is required';
//         else if (!/^[^@]+@[^@]+\.[^@]+$/.test(value)) error = 'Invalid email format';
//         break;
//       case 'password':
//         if (!value) error = 'This field is required';
//         else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,}$/.test(value))
//           error = 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character';
//         break;
//       case 'confirm_password':
//         if (!value) error = 'This field is required';
//         else if (value !== formData.password) error = 'Passwords do not match';
//         break;
//       case 'role':
//         if (!value) error = 'Role is required';
//         break;
//       case 'company_name':
//         if (formData.role === 'recruiter' && !value) error = 'Company Name is required for recruiters';
//         break;
//       case 'id':
//         if (formData.role === 'recruiter' && !value) error = 'ID is required for recruiters';
//         break;
//       default:
//         break;
//     }

//     setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
//   };

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData({ ...formData, [id]: value });
//     validateField(id, value);
//   };

//   const handleEducationChange = (index, field, value) => {
//     const updatedEducation = [...formData.education];
//     updatedEducation[index][field] = value;
//     setFormData({ ...formData, education: updatedEducation });
//   };

//   const addEducation = () => {
//     setFormData({ ...formData, education: [...formData.education, { degree: '', institution: '', graduated_year: '' }] });
//   };

//   const handleCompaniesChange = (index, field, value) => {
//     const updatedCompanies = [...formData.companies];
//     updatedCompanies[index][field] = value;
//     setFormData({ ...formData, companies: updatedCompanies });
//   };

//   const addCompany = () => {
//     setFormData({ ...formData, companies: [...formData.companies, { name: '', position: '', experience: '' }] });
//   };

//   const handleSkillsChange = (index, value) => {
//     const updatedSkills = [...formData.skills];
//     updatedSkills[index] = value;
//     setFormData({ ...formData, skills: updatedSkills });
//   };

//   const addSkill = () => {
//     setFormData({ ...formData, skills: [...formData.skills, ''] });
//   };

//   const handleLocationChange = (field, value) => {
//     setFormData({ ...formData, location: { ...formData.location, [field]: value } });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(formData);

//     // Validate all fields
//     Object.keys(formData).forEach((field) => validateField(field, formData[field]));

//     // Check if there are any errors
//     if (Object.values(errors).some((error) => error)) {
//       return; // Prevent form submission
//     }

//     try {
//       const response = await axios.post('http://127.0.0.1:5000/signup', formData);
//       alert(response.data.message);
//       navigate('/login');
//     } catch (error) {
//       if (error.response) {
//         setErrors((prevErrors) => ({ ...prevErrors, form: error.response.data.error }));
//       } else {
//         setErrors((prevErrors) => ({ ...prevErrors, form: 'An error occurred. Please try again.' }));
//       }
//     }
//   };

//   return (
//     <div className="sign-up-page">
//       <div className="sign-up-content">
//         <div className="sign-up-container">
//           <div className="image-container">
//             <img className="sign-up-image" src="/ai interview pl abf8db3d-0360-4f27-b0c1-d16aab7cae4e.png" alt="Sign Up" />
//           </div>
//           <div className="sign-up-form">
//             <h1 className="sign-up-title">Create an Account</h1>
//             {errors.form && <p className="error-message">{errors.form}</p>}
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label htmlFor="first_name" className="form-label">First Name</label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   className="form-input"
//                   onChange={handleChange}
//                 />
//                 {errors.first_name && <p className="error-message">{errors.first_name}</p>}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="last_name" className="form-label">Last Name</label>
//                 <input
//                   type="text"
//                   id="last_name"
//                   className="form-input"
//                   onChange={handleChange}
//                 />
//                 {errors.last_name && <p className="error-message">{errors.last_name}</p>}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="email" className="form-label">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   className="form-input"
//                   onChange={handleChange}
//                 />
//                 {errors.email && <p className="error-message">{errors.email}</p>}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="password" className="form-label">Password</label>
//                 <input
//                   type="password"
//                   id="password"
//                   className="form-input"
//                   onChange={handleChange}
//                 />
//                 {errors.password && <p className="error-message">{errors.password}</p>}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
//                 <input
//                   type="password"
//                   id="confirm_password"
//                   className="form-input"
//                   onChange={handleChange}
//                 />
//                 {errors.confirm_password && <p className="error-message">{errors.confirm_password}</p>}
//               </div>
//               <button type="submit" className="sign-up-button">Sign Up</button>
//             </form>
//             <p className="login-prompt">
//               Already have an account? <span className="login-link" onClick={() => navigate('/login')}>Login</span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SIGNUP;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./SIGNUP.css";

const SIGNUP = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    role: 'user',  // default value for the role
    company_name: '', // initially empty
    id: '' // initially empty
  });
  const [errors, setErrors] = useState({});

  const validateField = (field, value) => {
    let error = '';

    switch (field) {
      case 'first_name':
      case 'last_name':
        if (!value) error = 'This field is required';
        else if (!/^[a-zA-Z]+$/.test(value)) error = 'Name must contain only alphabets';
        break;
      case 'email':
        if (!value) error = 'This field is required';
        else if (!/^[^@]+@[^@]+\.[^@]+$/.test(value)) error = 'Invalid email format';
        break;
      case 'password':
        if (!value) error = 'This field is required';
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,}$/.test(value))
          error = 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character';
        break;
      case 'confirm_password':
        if (!value) error = 'This field is required';
        else if (value !== formData.password) error = 'Passwords do not match';
        break;
      case 'role':
        if (!value) error = 'Role is required';
        break;
      case 'company_name':
        if (formData.role === 'recruiter' && !value) error = 'Company Name is required for recruiters';
        break;
      case 'id':
        if (formData.role === 'recruiter' && !value) error = 'ID is required for recruiters';
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    validateField(id, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    // Validate all fields
    Object.keys(formData).forEach((field) => validateField(field, formData[field]));

    // Check if there are any errors
    if (Object.values(errors).some((error) => error)) {
      return; // Prevent form submission
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/signup', formData);
      alert(response.data.message);
      navigate('/login');
    } catch (error) {
      if (error.response) {
        setErrors((prevErrors) => ({ ...prevErrors, form: error.response.data.error }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, form: 'An error occurred. Please try again.' }));
      }
    }
  };

  return (
    <div className="sign-up-page">
      <div className="sign-up-content">
        <div className="sign-up-container">
          <div className="image-container">
            <img className="sign-up-image" src="/ai interview pl abf8db3d-0360-4f27-b0c1-d16aab7cae4e.png" alt="Sign Up" />
          </div>
          <div className="sign-up-form">
            <h1 className="sign-up-title">Create an Account</h1>
            {errors.form && <p className="error-message">{errors.form}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="first_name" className="form-label">First Name</label>
                <input
                  type="text"
                  id="first_name"
                  className="form-input"
                  onChange={handleChange}
                />
                {errors.first_name && <p className="error-message">{errors.first_name}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="last_name" className="form-label">Last Name</label>
                <input
                  type="text"
                  id="last_name"
                  className="form-input"
                  onChange={handleChange}
                />
                {errors.last_name && <p className="error-message">{errors.last_name}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  onChange={handleChange}
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  onChange={handleChange}
                />
                {errors.password && <p className="error-message">{errors.password}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                <input
                  type="password"
                  id="confirm_password"
                  className="form-input"
                  onChange={handleChange}
                />
                {errors.confirm_password && <p className="error-message">{errors.confirm_password}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="role" className="form-label">Role</label>
                <select
                  id="role"
                  className="form-input"
                  onChange={handleChange}
                  value={formData.role}
                >
                  <option value="user">User</option>
                  <option value="recruiter">Recruiter</option>
                </select>
                {errors.role && <p className="error-message">{errors.role}</p>}
              </div>
              
              {/* Conditionally render fields for recruiter */}
              {formData.role === 'recruiter' && (
                <>
                  <div className="form-group">
                    <label htmlFor="company_name" className="form-label">Company Name</label>
                    <input
                      type="text"
                      id="company_name"
                      className="form-input"
                      onChange={handleChange}
                    />
                    {errors.company_name && <p className="error-message">{errors.company_name}</p>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="id" className="form-label">ID</label>
                    <input
                      type="text"
                      id="id"
                      className="form-input"
                      onChange={handleChange}
                    />
                    {errors.id && <p className="error-message">{errors.id}</p>}
                  </div>
                </>
              )}

              <button type="submit" className="sign-up-button">Sign Up</button>
            </form>
            <p className="login-prompt">
              Already have an account? <span className="login-link" onClick={() => navigate('/login')}>Login</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SIGNUP;
