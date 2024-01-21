import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FirebaseService from "../services/FirebaseService";
import "../styles/details.css"
import "../styles/test.css";
import HeartAttackChart from "../components/HeartAttackChart";

import Loader from "../components/Loader";

import { useNavigate } from 'react-router-dom';
import { Navbar } from "../components/Navbar";

export const TestDetails = () => {
    const [document, setDocumentData] = useState("");
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState("");

    const navigate = useNavigate();

    const firebaseService = new FirebaseService();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const documentSnapshot = await firebaseService.getDocumentById(id);
                setDocumentData(documentSnapshot);
                setDate(documentSnapshot.DateCreated);


            } catch (error) {
                console.log("Unable to fetch data", error);
            }
        };
        fetchData();
    }, []);

    const handleBack = async (e) => {

        e.preventDefault();
        setLoading(true);


        navigate("/history");
    }

    const timeStampDate = date;
    const dateInMillis = timeStampDate.seconds * 1000

    const newDate = new Date(dateInMillis).toDateString() + ' at ' + new Date(dateInMillis).toLocaleTimeString()




    return (
        <div
            className="container-fluid bg-image backgroundStyle d-flex align-items-center justify-content-center vh-100"
            style={{ height: "100vh" }}
        >
            <Navbar></Navbar>
            {loading && <Loader></Loader>}
            <div className="container" style={{ height: "100%", maxWidth: "85%", marginLeft: "-10%" }}>
                <p
                    className="text-center"
                    style={{
                        marginTop: "1%",
                        marginBottom: "2%",
                        fontSize: "1.5em",
                        fontWeight: "550",
                        color: "white",
                    }}
                >
                    Here is a detailed view of your selected check-up result<br></br>
                    that was made at {newDate}!<br></br>
                </p>
                <form
                    className="form-r"
                    style={{ width: "55%", margin: "auto", transition: "margin-left 1s" }}
                    onSubmit={handleBack}
                >
                    <div className="form-group form-q">
                        <label htmlFor="age" className="label-q">
                            Age:
                        </label>
                        <input
                            type="number"
                            className="form-control input-q"
                            id="age"
                            name="Age"
                            value={document.Age}

                            style={{ width: "15%" }}
                            readOnly
                        />
                    </div>

                    <div className="form-group form-q">
                        <label htmlFor="highBP" className="label-q">
                        Have you ever been informed by a specialist that you have high
              blood pressure?                        </label>
                        <input
                            className="form-control input-q"
                            id="highBP"
                            name="HighBP"
                            value={document.HighBP}
                            style={{ width: "15%" }}
                            readOnly
                        />
                    </div>

                    <div className="form-group form-q">
                        <label htmlFor="highChol" className="label-q">
                        Have you ever been informed by a specialist that you have high
              cholesterol?
                        </label>
                        <input
                            className="form-control input-q"
                            id="highChol"
                            name="HighChol"
                            value={document.HighChol}
                            style={{ width: "15%" }}
                            readOnly                        >
                        </input>
                    </div>

                    <div className="form-group form-q">
                        <label htmlFor="smoker" className="label-q">
                        Have you smoked for more than 3 months in your life?
                        </label>
                        <input
                            className="form-control input-q"
                            id="smoker"
                            name="Smoker"
                            style={{ width: "15%" }}
                            value={document.Smoker}
                            readOnly
                        />

                    </div>

                    <div className="form-group form-q">
                        <label htmlFor="diffWalk" className="label-q">
                            Do you have difficulty walking or climbing?
                        </label>
                        <input
                            className="form-control input-q"
                            id="diffWalk"
                            name="DiffWalk"
                            value={document.DiffWalk}
                            style={{ width: "15%" }}
                            readOnly
                        />
                    </div>

                    <div className="form-group form-q">
                        <label htmlFor="income" className="label-q">
                            What is your total household income?
                        </label>
                        <input
                            className="form-control input-q"
                            id="income"
                            name="Income"
                            value={document.Income}
                            style={{ width: "15%" }}
                            readOnly />
                    </div>

                    <div className="form-group form-q">
                        <label htmlFor="diabetes" className="label-q">
                            Do you have a history of diabetes?
                        </label>
                        <input
                            className="form-control input-q"
                            id="diabetes"
                            name="Diabetes"
                            value={document.Diabetes}
                            style={{ width: "15%" }}
                            readOnly
                        />
                    </div>

                    <div className="form-group form-q">
                        <label htmlFor="genHlth" className="label-q">
                            How would you rate your general health?
                        </label>
                        <input
                            className="form-control input-q"
                            id="genHlth"
                            name="GenHlth"
                            value={document.GenHlth}
                            style={{ width: "15%" }}
                            readOnly
                        />
                    </div>

                    <div className="form-group form-q">
                        <label htmlFor="physHlth" className="label-q">
                            How many days in the last 30 days have you had poor physical
                            health?
                        </label>
                        <input
                            type="number"
                            className="form-control input-q"
                            id="physHlth"
                            name="PhysHlth"
                            value={document.PhysHlth}
                            max={30}
                            min={0}
                            style={{ width: "15%" }}
                            readOnly />
                    </div>

                    <div className="form-group form-q" style={{ marginBottom: "6%" }}>
                        <label htmlFor="stroke" className="label-q">
                            Do you have a history of stroke?
                        </label>
                        <input
                            className="form-control input-q"
                            id="stroke"
                            name="Stroke"
                            value={document.Stroke}
                            style={{ width: "15%" }}
                            readOnly />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ fontSize: "1.2em", fontWeight: "550" }}
                        >
                            Back
                        </button>
                    </div>
                </form>
            </div>
            <div
                className={`text-right chart-container chart-visible`}
                style={{ marginRight: "10%", maxWidth: "25%" }}
            >
                <HeartAttackChart heartAttackPredict={document.HeartDiseaseOrAttackChance}/>
                
              
            </div>
            
        </div>
    )
}