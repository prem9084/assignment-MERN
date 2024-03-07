import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Login/Login.css";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container login-container mt-5">
      <div className="row">
        <div className="col-md-7 col-sm-12 d-flex justify-content-center align-items-center">
          <img
            alt="photo"
            className="photo"
            height="400vh"
            src="https://media.istockphoto.com/id/1426988809/photo/security-password-login-online-concept-hands-typing-and-entering-username-and-password-of.webp?b=1&s=170667a&w=0&k=20&c=AJD5Wv30lmyILccJyMpQGhkmh0VhZ5WNDtk53MO1OVM="
          />
        </div>
        <div className="col-md-5 col-sm-12">
          <div className="card shadow">
            <div className="card-body px-5">
              <h4 className="card-title text-center mt-3 fw-bold">Log In</h4>
              <form onSubmit={handleForgot}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2 mt-4  mb-2 form-control input-bg"
                  placeholder="Phone number,username or email"
                />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className=" p-2 mb-2 form-control input-bg"
                  placeholder="Password"
                />
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className=" p-2 mb-2 form-control input-bg"
                  placeholder="Enter Your Febrate Sport"
                />

                <div className="mt-3 mb-5 d-grid">
                  <button type="submit" className="btn  btn-primary">
                    RESET
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
