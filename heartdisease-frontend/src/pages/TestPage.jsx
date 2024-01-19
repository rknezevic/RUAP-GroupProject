import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import "../styles/background.css";
import "../styles/test.css";
import FirebaseService from "../services/FirebaseService";
import HeartAttackChart from "../components/HeartAttackChart";
import Loader from "../components/Loader";
import AzureService from "../services/AzureService";

export const TestPage = () => {
  const firebaseService = new FirebaseService();
  const azureService = new AzureService();

  const [highBP, setHighBP] = useState("");
  const [highChol, setHighChol] = useState("");
  const [smoker, setSmoker] = useState("");
  const [diffWalk, setDiffWalk] = useState("");
  const [age, setAge] = useState("");
  const [income, setIncome] = useState("");
  const [diabetes, setDiabetes] = useState("");
  const [genHlth, setGenHlth] = useState("");
  const [physHlth, setPhysHlth] = useState("");
  const [stroke, setStroke] = useState("");
  const [userId, setUserId] = useState("");
  const [heartDiseaseChance, setHeartDiseaseChance] = useState(0.07);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChartVisible, setIsChartVisible] = useState(false);
  const [chartClass, setChartClass] = useState("chart-container");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !highBP ||
      !highChol ||
      !smoker ||
      !diffWalk ||
      !income ||
      !diabetes ||
      !genHlth ||
      !physHlth ||
      !stroke
    ) {
      setError("Please select options for all fields.");
      setLoading(false);
      return;
    }
    if (isNaN(age) || age <= 0) {
      setError("Please enter a valid age.");
      setLoading(false);
      return;
    }
    if (userId == "") {
      setError("User not logged in!");
      setLoading(false);
      return;
    }

    setError("");
    /*
    let heartDiseaseChance = await azureService.getHeartDiseasePrediction(
      highBP,
      highChol,
      smoker,
      stroke,
      diabetes,
      genHlth,
      physHlth,
      diffWalk,
      age,
      income
    );
    setHeartDiseaseChance(heartDiseaseChance);
      */
    setIsChartVisible(true);
    setChartClass("chart-visible");

    const predictionData = {
      HeartDiseaseOrAttackChance: heartDiseaseChance,
      Age: mapAgeToRange(age),
      Diabetes: diabetes,
      DiffWalk: diffWalk,
      GenHlth: genHlth,
      HighBP: highBP,
      HighChol: highChol,
      UserId: userId,
      Income: income,
      PhysHlth: physHlth,
      Smoker: smoker,
      Stroke: stroke,
    };

    await firebaseService.savePrediction(predictionData);
    setLoading(false);
  };

  const mapAgeToRange = (age) => {
    if (age <= 18) {
      return 1;
    } else if (age <= 23) {
      return 2;
    } else if (age <= 28) {
      return 3;
    } else if (age <= 33) {
      return 4;
    } else if (age <= 38) {
      return 5;
    } else if (age <= 43) {
      return 6;
    } else if (age <= 48) {
      return 7;
    } else if (age <= 53) {
      return 8;
    } else if (age <= 58) {
      return 9;
    } else if (age <= 63) {
      return 10;
    } else if (age <= 68) {
      return 11;
    } else {
      return 12;
    }
  };

  return (
    <div
      className="container-fluid bg-image backgroundStyle d-flex align-items-center justify-content-center vh-100"
      style={{ height: "100vh" }}
    >
      <Navbar></Navbar>
      {loading && <Loader></Loader>}
      <div className="container" style={{ height: "100%", maxWidth: "85%" }}>
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
          Answer a few quick questions to receive personalized insights into
          your heart health.<br></br> Let's start by getting to know you better!
        </p>
        <form
          className="form-r"
          style={{ width: "55%", margin: "auto", transition: "margin-left 1s" }}
          onSubmit={handleSubmit}
        >
          <div className="form-group form-q">
            <label htmlFor="age" className="label-q">
              How old are you?
            </label>
            <input
              type="number"
              className="form-control input-q"
              id="age"
              name="Age"
              value={age}
              max={110}
              min={10}
              style={{ width: "15%" }}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="form-group form-q">
            <label htmlFor="highBP" className="label-q">
              Have you ever been informed by a specialist that you have high
              blood pressure?
            </label>
            <select
              className="form-select input-q"
              id="highBP"
              name="HighBP"
              value={highBP}
              style={{ width: "15%" }}
              onChange={(e) => setHighBP(e.target.value)}
            >
              <option value=""></option>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          <div className="form-group form-q">
            <label htmlFor="highChol" className="label-q">
              Have you ever been informed by a specialist that you have high
              cholesterol?
            </label>
            <select
              className="form-select input-q"
              id="highChol"
              name="HighChol"
              value={highChol}
              style={{ width: "15%" }}
              onChange={(e) => setHighChol(e.target.value)}
            >
              <option value=""></option>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          <div className="form-group form-q">
            <label htmlFor="smoker" className="label-q">
              Have you smoked for more than 3 months in your life?
            </label>
            <select
              className="form-select input-q"
              id="smoker"
              name="Smoker"
              style={{ width: "15%" }}
              value={smoker}
              onChange={(e) => setSmoker(e.target.value)}
            >
              <option value=""></option>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          <div className="form-group form-q">
            <label htmlFor="diffWalk" className="label-q">
              Do you have difficulty walking or climbing?
            </label>
            <select
              className="form-select input-q"
              id="diffWalk"
              name="DiffWalk"
              value={diffWalk}
              style={{ width: "15%" }}
              onChange={(e) => setDiffWalk(e.target.value)}
            >
              <option value=""></option>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          <div className="form-group form-q">
            <label htmlFor="income" className="label-q">
              What is your total household income
            </label>
            <select
              className="form-select input-q"
              id="income"
              name="Income"
              value={income}
              style={{ width: "15%" }}
              onChange={(e) => setIncome(e.target.value)}
            >
              <option value=""></option>
              <option value="1">$10,000+</option>
              <option value="2">$20,000+</option>
              <option value="3">$30,000+</option>
              <option value="4">$40,000+</option>
              <option value="5">$50,000+</option>
              <option value="6">$75,000+</option>
            </select>
          </div>

          <div className="form-group form-q">
            <label htmlFor="diabetes" className="label-q">
              Do you have a history of diabetes?
            </label>
            <select
              className="form-select input-q"
              id="diabetes"
              name="Diabetes"
              value={diabetes}
              style={{ width: "15%" }}
              onChange={(e) => setDiabetes(e.target.value)}
            >
              <option value=""></option>
              <option value="0">No</option>
              <option value="1">Pre-diabetes</option>
              <option value="2">Yes</option>
            </select>
          </div>

          <div className="form-group form-q">
            <label htmlFor="genHlth" className="label-q">
              How would you rate your general health?
            </label>
            <select
              className="form-select input-q"
              id="genHlth"
              name="GenHlth"
              value={genHlth}
              style={{ width: "15%" }}
              onChange={(e) => setGenHlth(e.target.value)}
            >
              <option value=""></option>
              <option value="5">Poor</option>
              <option value="4">Fair</option>
              <option value="3">Good</option>
              <option value="2">Very Good</option>
              <option value="1">Excellent</option>
            </select>
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
              value={physHlth}
              max={30}
              min={0}
              style={{ width: "15%" }}
              onChange={(e) => setPhysHlth(e.target.value)}
            />
          </div>

          <div className="form-group form-q" style={{ marginBottom: "6%" }}>
            <label htmlFor="stroke" className="label-q">
              Do you have a history of stroke?
            </label>
            <select
              className="form-select input-q"
              id="stroke"
              name="Stroke"
              value={stroke}
              style={{ width: "15%" }}
              onChange={(e) => setStroke(e.target.value)}
            >
              <option value=""></option>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          <div className="text-center">
            {error && (
              <p className="text-danger" style={{ fontSize: "1.1em" }}>
                {error}
              </p>
            )}
            <button
              type="submit"
              className="btn btn-primary"
              style={{ fontSize: "1.2em", fontWeight: "550" }}
            >
              Predict
            </button>
          </div>
        </form>
      </div>
      <div
        className={`text-center chart-container ${chartClass}`}
        style={{ marginRight: "0%", maxWidth: "25%" }}
      >
        {isChartVisible && (
          <HeartAttackChart
            heartAttackPredict={heartDiseaseChance}
          ></HeartAttackChart>
        )}
      </div>
    </div>
  );
};
