import React from "react";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";

import "../styles/background.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const HomePage = () => {
    //const [state, useState] = useState();

    return (

        <div className="container-fluid bg-image backgroundStyle" >
            <Navbar />
            <div className="row justify-content-center align-items-center vh-100">
                <div className="col-md-5 text-center" style={{ marginRight: '30px'}}>
                    <h1>Your heart is your everything!</h1>
                    <br/>
                    <p>
                        Heart disease remains a leading global cause of death, claiming an estimated 17.9 million lives annually, according to the World Health Organization. This encompasses various conditions like coronary artery disease and heart attacks.
                        <br/>Risk factors such as poor diets, lack of exercise, smoking, excessive alcohol, and stress contribute significantly. Heart health impacts not only individuals but also families and societies due to increased healthcare costs and reduced productivity.  </p>
                    <br/>
                    <Link to = "/test">
                    <button className="btn btn-primary btn-lg">Check your heart here <FontAwesomeIcon icon={faArrowRight} /></button>
                    </Link>
                </div>
                <div className="col-md-5 text-left style={{ marginLeft: '-70px' }}">
                    <img src='/Doktor.png' alt="Tvoja slika" className="img-fluid" style={{ opacity: 0.75 }} />
                </div>
            </div>
        </div>

    );

}