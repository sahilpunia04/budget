import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Budget() {
  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem("budget");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    category: "",
    amount: "",
  });

  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(budgets));
  }, [budgets]);

  const addBudget = () => {
    if (!form.category || !form.amount) return;

    setBudgets((prev) => [...prev, form]);
    setForm({ category: "", amount: "" });
  };

  // ✅ DELETE
  const deleteBudget = (index) => {
    setBudgets((prev) => prev.filter((_, i) => i !== index));
  };

  const total = budgets.reduce((a, b) => a + Number(b.amount), 0);

  return (
    <div>
      <Navbar />

      <div className="container">
        <h2>Budget</h2>

        <input
          value={form.category}
          placeholder="Category"
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        />

        <input
          type="number"
          value={form.amount}
          placeholder="Amount"
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value })
          }
        />

        <button onClick={addBudget}>Add Budget</button>

        <div className="card">
          <h3>Total Budget: ₹{total}</h3>
        </div>

        {budgets.map((b, i) => (
          <div key={i} className="card">
            {b.category} - ₹{b.amount}
            <button onClick={() => deleteBudget(i)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}