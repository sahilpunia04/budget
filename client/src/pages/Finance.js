import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Finance() {
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem("finance");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    type: "Loan Given",
    name: "",
    amount: "",
  });

  useEffect(() => {
    localStorage.setItem("finance", JSON.stringify(records));
  }, [records]);

  const addRecord = () => {
    if (!form.name || !form.amount) return;

    setRecords((prev) => [...prev, form]);

    setForm({ type: "Loan Given", name: "", amount: "" });
  };

  const total = (type) =>
    records
      .filter((r) => r.type === type)
      .reduce((a, b) => a + Number(b.amount), 0);

  return (
    <div>
      <Navbar />

      <div className="container">
        <h2>Finance</h2>

        <div className="card">
          <p>Loan Given: ₹{total("Loan Given")}</p>
          <p>Loan Taken: ₹{total("Loan Taken")}</p>
          <p>FD: ₹{total("Fixed Deposit")}</p>
          <p>Stocks: ₹{total("Stocks")}</p>
        </div>

        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option>Loan Given</option>
          <option>Loan Taken</option>
          <option>Fixed Deposit</option>
          <option>Stocks</option>
        </select>

        <input
          value={form.name}
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="number"
          value={form.amount}
          placeholder="Amount"
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <button onClick={addRecord}>Add</button>

        {records.map((r, i) => (
          <div key={i} className="card">
            {r.type} - {r.name} - ₹{r.amount}
          </div>
        ))}
      </div>
    </div>
  );
}