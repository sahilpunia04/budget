import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="navbar">
      <h2 className="logo">💰 BudgetPro</h2>

      <div className="nav-links">
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={logout} className="logout">Logout</button>
      </div>
    </div>
  );
}