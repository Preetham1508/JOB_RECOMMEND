import React, { useEffect } from "react";
import { Routes, Route, useNavigationType, useLocation } from "react-router-dom";
import SIGNUP from "./pages/SIGNUP";
import LOGIN from "./pages/LOGIN";
import Profile from "./pages/Profile";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import EditProfile from "./pages/EditProfile";
import Connections from "./pages/Connections";
import Jobs from "./pages/Jobs";
import './App.css';
import RecruiterTable from "./pages/RecruitersTable";
import JobForm from "./pages/JobForm";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ''; // Required for showing the confirmation dialog
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "Login";
        metaDescription = "Log in to your account.";
        break;
      case "/sign-up":
        title = "Sign Up";
        metaDescription = "Create an account.";
        break;
      case "/profile":
        title = "Profile";
        metaDescription = "View your profile.";
        break;
      case "/editprofile":
        title = "Edit Profile";
        metaDescription = "Edit your profile.";
        break;
      case "/connections":
        title = "Connections";
        metaDescription = "Connect with other users.";
      case "/jobs":
        title = "Jobs";
        metaDescription = "Find and apply for jobs.";
      default:
        title = "App";
        metaDescription = "App description.";
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector('head > meta[name="description"]');
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <div className="app-container">
    <div className="abc">
      <Navbar />
      </div>
      <div className="content-wrap">
        <Routes>
          <Route path="/" element={<LOGIN />} />
          <Route path="/login" element={<LOGIN />} />
          <Route path="/sign-up" element={<SIGNUP />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/recruiterslist" element={<RecruiterTable/>} />
          <Route path="/jobform" element={<JobForm />} />
        </Routes>
        {/* <UserReports/> */}
        {/* <RecruiterTable/> */}
      </div>
      <Footer />
    </div>
  );
}

export default App;