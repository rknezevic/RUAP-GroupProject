import { Navbar } from "../components/Navbar";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import FirebaseService from "../services/FirebaseService";
import { Card } from "../components/TestCard";
import "../styles/background.css";
import { Loader } from "../components/Loader";
export const HistoryPage = () => {
    const [userId, setUserId] = useState("");
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();
    const firebaseService = new FirebaseService();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await firebaseService.getCurrentUser();
                if (user) {
                    setUserId(user.uid);
                    const data = await firebaseService.getUserData(user.uid);
                    setUserData(data);
                } else {
                    console.log("Nema trenutno prijavljenog korisnika.");
                }
            } catch (error) {
                console.error("Error fetching data in history page:", error);
            }
        };

        fetchData();
    }, []);

    const handleCardClick = (documentId) => {
        navigate(`/test-details/${documentId}`);
    };


    return (
        <div className="container-fluid bg-image backgroundStyle d-flex flex-column align-items-center justify-content-center vh-100"
             style={{ height: "100vh" }}>
          <div className="title-history">
            <p>Here you can find all your tests made!</p>
          </div>
          <Navbar />
          <div className="cards-container">
            {userData.map((data, index) => (
              <Card key={index} data={data} onClick={() => handleCardClick(data.id)} />
            ))}
          </div>
        </div>
      );
};
