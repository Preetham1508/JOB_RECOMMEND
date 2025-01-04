// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import axios from 'axios';
// import "./LOGIN.css";
// import { logincontext } from "../contexts/Logincontext";
// import forge from 'node-forge';

// const LOGIN = () => {
//   let [currentuser,loginerror,UserloginStatus,Loginuser,Logoutuser,isUser,isRecruiter,isAdmin] = useContext(logincontext);
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ mail: '', password: ''});
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData({ ...formData, [id]: value });
//     setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }));
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.mail) newErrors.mail = 'Mail id is required';
//     if (!formData.password) newErrors.password = 'Password is required';
 
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       console.log(formData);
//       Loginuser(formData);
//       const response = await axios.post('http://127.0.0.1:5000/login', formData);
//       console.log('Login Success:', response.data);
//       navigate('/profile');
//     } catch (error) {
//       if (error.response) {
//         setErrors((prevErrors) => ({ ...prevErrors, form: error.response.data.error }));
//       } else {
//         setErrors((prevErrors) => ({ ...prevErrors, form: 'An error occurred. Please try again.' }));
//       }
//     }
//   };

//   const onSuccess = (response) => {
//     console.log('Login Success:', response);
//     navigate('/dashboard');
//   };

//   const onFailure = (error) => {
//     console.log('Login Failed:', error);
//   };

//   return (
//     <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
//       <div className="login-page">
//         <div className="login-content">
//           <div className="login-image">
//             <img src="/ai interview pl 06961ac2-66b8-4552-b56b-32d3091c2f2a.jpg" alt="AI Interview" />
//           </div>
//           <div className="login-form">
//             <h1 className="login-title">Login</h1>
//             {errors.form && <p className="error-message">{errors.form}</p>}
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label htmlFor="mail" className="form-label">EMail</label>
//                 <input
//                   type="text"
//                   id="mail"
//                   className="form-input"
//                   value={formData.mail}
//                   onChange={handleChange}
//                 />
//                 {errors.mail && <p className="error-message">{errors.mail}</p>}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="password" className="form-label">Password</label>
//                 <input
//                   type="password"
//                   id="password"
//                   className="form-input"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//                 {errors.password && <p className="error-message">{errors.password}</p>}
//               </div>

             

//               <button type="submit" className="login-button">Login</button>
//             </form>
//             <p className="sign-up-prompt">
//               Don't have an account? <span className="sign-up-link" onClick={() => navigate('/sign-up')}>Sign up</span>
//             </p>
//             <div className="or-divider">--- or ---</div>
//             <div className="google-login">
//               <GoogleLogin
//                 onSuccess={onSuccess}
//                 onError={onFailure}
//                 useOneTap
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </GoogleOAuthProvider>
//   );
// };

// export default LOGIN;



import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import "./LOGIN.css";
import { logincontext } from "../contexts/Logincontext";
import forge from 'node-forge';

const LOGIN = () => {
  let [currentuser,loginerror,UserloginStatus,Loginuser,Logoutuser,isUser,isRecruiter,isAdmin] = useContext(logincontext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ mail: '', password: '', role: 'user' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.mail) newErrors.mail = 'Mail id is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.role) newErrors.role = 'Role is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const publicKey = `-----BEGIN PUBLIC KEY-----
  // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyi275+jqxHYZpePBigjQ
  // Lffq3jpFD3jOFQPdLcPRzUYSGl7O00qQ0UZiKO6PoYVsTHof3NFre7o+Q76ARcTc
  // w27SZduxrQMhP0lmMKIDBbCweIdZz6GMAE4XWcXDJDWKeYxh9AK0oSlxR64MOpdo
  // sL0BkbfC1FWqVGRhisbl9B0KfCLvXWct3b6sEXwgaiMVF5/e2BsIIkiYepRS+wqd
  // C05vL0NxfwM5fB+pGu5IhiuIjvf4zaGHdXngeuzi4b0YUeIGNggNO9wBTAHT9kv4
  // CJShhhWJjWplsOsGtYkwZfS9WCqs6yTL1ISDbCuNZ77anY4BWNff+9lFEGeffKHC
  // vQIDAQAB
  // -----END PUBLIC KEY-----`;

  // const encryptPassword = (password) => {
  //   const rsa = forge.pki.publicKeyFromPem(publicKey);
  //   const encrypted = rsa.encrypt(password, 'RSA-OAEP');
  //   return window.btoa(encrypted);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      // const encryptedPassword = encryptPassword(formData.password);
      // formData.password = encryptedPassword;
      // console.log(encryptedPassword);
      Loginuser(formData);
      const response = await axios.post('http://127.0.0.1:5000/login', formData);
      console.log('Login Success:', response.data);

      if (response.data.user.role=="user") navigate('/profile'); else if(response.data.user.role=="recruiter") navigate('/jobform'); else if(response.data.user.role=="admin")
      navigate('/recruiterslist');    } catch (error) {
      if (error.response) {
        setErrors((prevErrors) => ({ ...prevErrors, form: error.response.data.error }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, form: 'An error occurred. Please try again.' }));
      }
    }
  };

  const onSuccess = (response) => {
    console.log('Login Success:', response);
    navigate('/dashboard');
  };

  const onFailure = (error) => {
    console.log('Login Failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="login-page">
        <div className="login-content">
          <div className="login-image">
            <img src="/ai interview pl 06961ac2-66b8-4552-b56b-32d3091c2f2a.jpg" alt="AI Interview" />
          </div>
          <div className="login-form">
            <h1 className="login-title">Login</h1>
            {errors.form && <p className="error-message">{errors.form}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="mail" className="form-label">EMail</label>
                <input
                  type="text"
                  id="mail"
                  className="form-input"
                  value={formData.mail}
                  onChange={handleChange}
                />
                {errors.mail && <p className="error-message">{errors.mail}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <p className="error-message">{errors.password}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="role" className="form-label">Role</label>
                <select
                  id="role"
                  className="form-input"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="user">User</option>
                  <option value="recruiter">Recruiter</option> 
                  <option value="admin">Admin</option> 
                </select>
                {errors.role && <p className="error-message">{errors.role}</p>}
              </div>

              <button type="submit" className="login-button">Login</button>
            </form>
            <p className="sign-up-prompt">
              Don't have an account? <span className="sign-up-link" onClick={() => navigate('/sign-up')}>Sign up</span>
            </p>
            <div className="or-divider">--- or ---</div>
            <div className="google-login">
              <GoogleLogin
                onSuccess={onSuccess}
                onError={onFailure}
                useOneTap
              />
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LOGIN;
