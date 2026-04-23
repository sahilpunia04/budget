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

  // ✅ DELETE FUNCTION
  const deleteRecord = (index) => {
    setRecords((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Navbar />

      <div className="container">
        <h2>Finance</h2>

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
            <button onClick={() => deleteRecord(i)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}