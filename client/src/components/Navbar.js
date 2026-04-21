import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <div className="card" style={{ display: "flex", justifyContent: "space-between" }}>
      <h3>💰 BudgetPro</h3>

      <div>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/analytics")}>Analytics</button>
        <button onClick={() => navigate("/transactions")}>Transactions</button>
        <button onClick={() => navigate("/budget")}>Budget</button>
        <button onClick={() => navigate("/finance")}>Finance</button>
        <button onClick={() => navigate("/cards")}>Cards</button>
        <button onClick={() => navigate("/profile")}>Profile</button>
        <button onClick={toggleTheme}>🌙</button>
      </div>
    </div>
  );
}