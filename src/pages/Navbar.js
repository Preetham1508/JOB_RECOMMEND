import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { logincontext } from "../contexts/Logincontext";
import { useContext } from "react";

const Navbar = () => {
  const [currentuser, loginerror, UserloginStatus, Loginuser, Logoutuser, isUser, isRecruiter, isAdmin] = useContext(logincontext);
  console.log(currentuser, UserloginStatus);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Smart Suggest
        </Link>
        <div className="navbar-links">
          {UserloginStatus ? (
            <>
            {isUser && (
              <>
                <Link to="/profile" className="navbar-link">Profile</Link>
                <Link to="/connections" className="navbar-link">Connections</Link>
                <Link to="/jobs" className="navbar-link">Jobs</Link>
              </>
            )}
              {/* Conditional rendering based on user role */}
              {isAdmin && (
                <>
                  {/* <Link to="/userreports" className="navbar-link">User Reports</Link> */}
                  <Link to="/recruiterslist" className="navbar-link">Recruiters List</Link>
                </>
              )}

              {/* {isRecruiter && (
                <>
                  <Link to="/userreports" className="navbar-link">User Reports</Link>
                </>
              )} */}

              <Link to="/" onClick={Logoutuser} className="navbar-link">Logout</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/sign-up" className="navbar-link">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
