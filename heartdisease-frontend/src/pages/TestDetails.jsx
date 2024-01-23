import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FirebaseService from "../services/FirebaseService";
import "../styles/details.css";
import "../styles/test.css";
import HeartAttackChart from "../components/HeartAttackChart";
import UtilitiesService from "../services/UtilitiesService";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const TestDetails = () => {
  const [document, setDocumentData] = useState("");
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  const firebaseService = new FirebaseService();
  const utilitiesService = new UtilitiesService();
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
    setLoading(false);
  }, []);

  const timeStampDate = date;
  const dateInMillis = timeStampDate.seconds * 1000;

  const newDate =
    new Date(dateInMillis).toDateString() +
    " at " +
    new Date(dateInMillis).toLocaleTimeString();

  return (
    <div
      className="container-fluid bg-image backgroundStyle d-flex align-items-center justify-content-center vh-100"
      style={{ height: "100vh" }}
    >
      <Navbar></Navbar>
      {loading && <Loader></Loader>}
      <div
        className="container"
        style={{ height: "100%", maxWidth: "85%", marginLeft: "-10%" }}
      >
        <p
          className="text-center"
          style={{
            marginTop: "4%",
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
        >
          <div className="form-group form-q">
            <label htmlFor="age" className="label-q">
              Age Group:
            </label>
            <span
              className="form-control input-q textWhite"
              id="age"
              name="Age"
              style={{ width: "15%" }}
            >
              {utilitiesService.convertAge(document.Age)}
            </span>
          </div>

          <div className="form-group form-q">
            <label htmlFor="highBP" className="label-q">
              Have you ever been informed by a specialist that you have high
              blood pressure?{" "}
            </label>
            <span
              className="form-control input-q textWhite"
              id="highBP"
              name="HighBP"
              style={{ width: "15%" }}
            >
              {utilitiesService.convertToYesAndNo(document.HighBP)}
            </span>
          </div>

          <div className="form-group form-q">
            <label htmlFor="highChol" className="label-q">
              Have you ever been informed by a specialist that you have high
              cholesterol?
            </label>
            <span
              className="form-control input-q textWhite"
              id="highChol"
              name="HighChol"
              style={{ width: "15%" }}
            >
              {utilitiesService.convertToYesAndNo(document.HighChol)}
            </span>
          </div>

          <div className="form-group form-q">
            <label htmlFor="smoker" className="label-q">
              Have you smoked for more than 3 months in your life?
            </label>
            <span
              className="form-control input-q textWhite"
              id="smoker"
              name="Smoker"
              style={{ width: "15%" }}
            >
              {utilitiesService.convertToYesAndNo(document.Smoker)}
            </span>
          </div>

          <div className="form-group form-q">
            <label htmlFor="diffWalk" className="label-q textWhite">
              Do you have difficulty walking or climbing?
            </label>
            <span
              className="form-control input-q textWhite"
              id="diffWalk"
              name="DiffWalk"
              style={{ width: "15%" }}
            >
              {utilitiesService.convertToYesAndNo(document.DiffWalk)}
            </span>
          </div>

          <div className="form-group form-q">
            <label htmlFor="income" className="label-q textWhite">
              What is your total household income?
            </label>
            <span
              className="form-control input-q textWhite"
              id="income"
              name="Income"
              style={{ width: "15%" }}
            >
              {utilitiesService.convertIncome(document.Income)}
            </span>
          </div>

          <div className="form-group form-q">
            <label htmlFor="diabetes" className="label-q">
              Do you have a history of diabetes?
            </label>
            <span
              className="form-control input-q textWhite"
              id="diabetes"
              name="Diabetes"
              style={{ width: "15%" }}
            >
              {utilitiesService.convertToYesAndNo(document.Diabetes)}
            </span>
          </div>

          <div className="form-group form-q">
            <label htmlFor="genHlth" className="label-q">
              How would you rate your general health?
            </label>
            <span
              className="form-control input-q textWhite"
              id="genHlth"
              name="GenHlth"
              style={{ width: "15%" }}
            >
              {utilitiesService.convertGeneralHealth(document.GenHlth)}
            </span>
          </div>

          <div className="form-group form-q">
            <label htmlFor="physHlth" className="label-q">
              How many days in the last 30 days have you had poor physical
              health?
            </label>
            <span
              className="form-control input-q textWhite"
              id="physHlth"
              name="PhysHlth"
              style={{ width: "15%" }}
            >
              {document.PhysHlth}
            </span>
          </div>

          <div className="form-group form-q" style={{ marginBottom: "6%" }}>
            <label htmlFor="stroke" className="label-q">
              Do you have a history of stroke?
            </label>
            <span
              className="form-control input-q textWhite"
              id="stroke"
              name="Stroke"
              style={{ width: "15%" }}
            >
              {utilitiesService.convertToYesAndNo(document.Stroke)}
            </span>
          </div>
        </form>
      </div>
      <div
        className={`text-right chart-container chart-visible`}
        style={{ marginRight: "10%", maxWidth: "25%" }}
      >
        <HeartAttackChart
          heartAttackPredict={document.HeartDiseaseOrAttackChance}
        />
      </div>
    </div>
  );
};
