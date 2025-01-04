import { logincontext } from "./Logincontext";
import React, { useState } from "react";
import axios from "axios";

function Userloginstore({ children }) {
    const [currentuser, setcurrentuser] = useState({});
    const [loginerror, setloginerror] = useState("");
    const [UserloginStatus, setUserloginStatus] = useState(false);
    
    // Separate states to track user roles
    const [isUser, setIsUser] = useState(false);
    const [isRecruiter, setIsRecruiter] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const Loginuser = async (userobj) => {
        try {
            console.log(userobj);
            const fetchData = await axios.post('http://127.0.0.1:5000/login', userobj, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const dataRes = fetchData.data;
            console.log(dataRes);

            if (dataRes.message === "Login successful") {
                setcurrentuser(dataRes.user); // Store user details
                setUserloginStatus(true);     // Mark login status as true
                setloginerror("");

                console.log(dataRes);

                // Role-based state management
                const userRole = dataRes.user.role;
                if (userRole === "user") {
                    setIsUser(true);
                    setIsRecruiter(false);
                    setIsAdmin(false);
                } else if (userRole === "recruiter") {
                    setIsRecruiter(true);
                    setIsUser(false);
                    setIsAdmin(false);
                } else if (userRole === "admin") {
                    setIsAdmin(true);
                    setIsUser(false);
                    setIsRecruiter(false);
                }
            } else {
                setloginerror(dataRes.error || "Login failed.");
            }
        } catch (error) {
            // Handle any errors
            console.error('Error:', error);
            setloginerror('An error occurred while logging in.');
        }
    };

    const Logoutuser = () => {
        setUserloginStatus(false);
        setcurrentuser({});
        
        // Reset all role states on logout
        setIsUser(false);
        setIsRecruiter(false);
        setIsAdmin(false);
    };

    return (
        <logincontext.Provider value={[currentuser,loginerror,UserloginStatus,Loginuser,Logoutuser,isUser,isRecruiter,isAdmin]}>
            {children}
        </logincontext.Provider>
    );
}

export default Userloginstore;
