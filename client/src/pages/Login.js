import React, { useState } from "react";
import API from "../services/api";
import "./Login.css";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      const url = isLogin ? "/auth/login" : "/auth/register";

      const res = await API.post(url, form);

      localStorage.setItem("token", res.data.token);
      alert("Success!");
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        {/* 🔥 HEADER */}
        <div className="login-header">
          <h1>Budgeting App 💰</h1>
          <p>Manage your money smarter, faster & easier</p>
        </div>

        {/* 🔁 TOGGLE */}
        <div className="toggle">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {/* 🧾 FORM */}
        {!isLogin && (
          <input
            placeholder="Full Name"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        )}

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* 🔘 BUTTON */}
        <button className="submit-btn" onClick={handleSubmit}>
          {isLogin ? "Login" : "Create Account"}
        </button>

      </div>
    </div>
  );
}