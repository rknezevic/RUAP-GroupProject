import React, { useState } from "react";
import { app } from "../App";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  //const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleRegister = async (
    firstName,
    lastName,
    email,
    password,
    confirmPassword
  ) => {
    if (password !== confirmPassword) {
      console.error("Lozinke se ne podudaraju!");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          navigate("/login");

          /*
        firebase.firestore().collection('users').doc(user.uid).set({
          firstName,
          lastName,
          email,
        });
*/
        }
      );

      console.log("aloooo");
      //console.log(result);
      console.log("Registracija uspješna:");
      navigate("/login");
    } catch (error) {
      console.error("Pogreška prilikom registracije:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button
        className="btn btn-primary"
        onClick={() =>
          handleRegister(firstName, lastName, email, password, confirmPassword)
        }
      >
        Register
      </button>
    </div>
  );
}
