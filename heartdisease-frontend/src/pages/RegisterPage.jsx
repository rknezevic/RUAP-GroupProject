import React, { useState } from "react";
import { app } from "../App";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleRegister = async (e, email, password, confirmPassword) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      alert("Fields can't be empty. Please fill it in.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords doesn't match!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          navigate("/login");
        }
      );
      navigate("/login");
    } catch (error) {
      console.error("Pogreška prilikom registracije:", error);
    }
  };

  return (
    <div className="login-container backgroundStyle">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Register</h2>
                <form>
                  <div className="form-group mb-3 input-q">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group text-center mb-2">
                    <button
                      className="btn btn-primary btn-block"
                      onClick={(e) =>
                        handleRegister(e, email, password, confirmPassword)
                      }
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
