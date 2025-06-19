import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api"; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("token/", {
        username: email, 
        password: password,
      });

      
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      
      API.defaults.headers.common["Authorization"] = `Bearer ${res.data.access}`;

      navigate("/practice"); 
    } catch (err) {
      alert("Login failed. Check your email and password.");
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
      <div className="border p-4 rounded shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email / Username</label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="checkMeOut" />
            <label className="form-check-label" htmlFor="checkMeOut">Remember me</label>
          </div>
          <button type="submit" className="btn btn-dark w-100">Login</button>
        </form>
      </div>
    </div>
  );
}
