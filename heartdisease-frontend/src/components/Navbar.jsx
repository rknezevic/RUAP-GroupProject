import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import firebase from "firebase/compat/app";
import FirebaseService from "../services/FirebaseService";
import SmallLogo from "./SmallLogo";
import "../styles/nav.css";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faHome,
  faRightFromBracket,
  faSignIn,
  faFileWaveform,
  faHeartPulse,
} from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);
  const firebaseService = new FirebaseService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await firebaseService.getCurrentUser();
        setUserId(user.uid);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        navigate("/login");
      })
      .catch(function (error) {
        console.error("Error logging out: ", error);
        alert("Error logging out");
      });
  };
  return (
    <div className="sidebar">
      <SmallLogo />
      <ul className="nav-links">
        <li className="nav-item">
          <Link className="link-style" to="/">
            <span className="icon">
              <FontAwesomeIcon className="fontawesome" icon={faHome} />
            </span>
            <span className="nav-text"> Home</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="link-style" to="/test">
            <span className="icon">
              <FontAwesomeIcon className="fontawesome" icon={faHeartPulse} />
            </span>
            <span className="nav-text"> Check my heart</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="link-style" to="/history">
            <span className="icon">
              <FontAwesomeIcon className="fontawesome" icon={faFileWaveform} />
            </span>
            <span className="nav-text"> History</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="link-style"
            to="https://github.com/rknezevic/RUAP-GroupProject"
          >
            <span className="icon">
              <FontAwesomeIcon className="fontawesome" icon={faGithub} />
            </span>
            <span className="nav-text">Github</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="link-style" to="/login" onClick={handleLogout}>
            <span className="icon">
              {!userId && (
                <FontAwesomeIcon className="fontawesome" icon={faSignIn} />
              )}
              {userId && (
                <FontAwesomeIcon
                  className="fontawesome"
                  icon={faRightFromBracket}
                />
              )}
            </span>
            {userId && <span className="nav-text">Logout</span>}
            {!userId && <span className="nav-text">Sign In</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};
