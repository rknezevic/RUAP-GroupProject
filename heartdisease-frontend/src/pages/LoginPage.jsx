import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/LoginPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          navigate("/");
        }
      );
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  };

  return (
      <div className="login-container">
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title text-center mb-4">Login</h2>
                  <form>
                    <div className="form-group mb-3">
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
                    <div className="form-group">
                      <button
                        className="btn btn-primary btn-block"
                        onClick={(e) => handleLogin(e)}
                      >
                        Login
                      </button>
                    </div>
                  </form>
                  <p className="text-center">
                    Don't have an account?{" "}
                    <Link to="/register"> Register here!</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
