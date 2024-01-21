import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FirebaseService from "../services/FirebaseService";
import LoginPage from "../pages/LoginPage";

const RequireAuthPage = ({ page }) => {
  const navigate = useNavigate();
  const firebaseService = new FirebaseService();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const currentUser = await firebaseService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error checking current user:", error);
        setUser(false); // Set user to false in case of an error
      }
    };
    checkCurrentUser();
  }, []);

  if (!user) {
    console.log("not logged in, redirecting");
    return <LoginPage></LoginPage>;
  } else {
    return page;
  }
};

export default RequireAuthPage;
