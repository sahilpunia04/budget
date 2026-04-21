import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Cards() {
  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem("cards");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    bank: "",
    type: "Debit",
    expiry: "",
    limit: "",
  });

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  const addCard = () => {
    if (!form.bank || !form.limit) return;

    setCards((prev) => [...prev, form]);

    setForm({ bank: "", type: "Debit", expiry: "", limit: "" });
  };

  return (
    <div>
      <Navbar />

      <div className="container">
        <h2>Cards</h2>

        <input
          value={form.bank}
          placeholder="Bank Name"
          onChange={(e) => setForm({ ...form, bank: e.target.value })}
        />

        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option>Debit</option>
          <option>Credit</option>
        </select>

        <input
          type="date"
          value={form.expiry}
          onChange={(e) => setForm({ ...form, expiry: e.target.value })}
        />

        <input
          type="number"
          value={form.limit}
          placeholder="Limit"
          onChange={(e) => setForm({ ...form, limit: e.target.value })}
        />

        <button onClick={addCard}>Add Card</button>

        {cards.map((c, i) => (
          <div key={i} className="card">
            {c.bank} ({c.type}) - Exp: {c.expiry} - ₹{c.limit}
          </div>
        ))}
      </div>
    </div>
  );
}