import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "",
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const res = await API.get("/transactions");
    setTransactions(res.data);
  };

  const addTransaction = async () => {
    await API.post("/transactions", form);
    setForm({ type: "expense", amount: "", category: "" });
    fetchTransactions();
  };

  const deleteTransaction = async (id) => {
    await API.delete(`/transactions/${id}`);
    fetchTransactions();
  };

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  return (
    <div>
      <Navbar />

      <div className="container">
        <h2>Dashboard</h2>

        {/* Cards */}
        <div className="card balance">Balance: ₹{income - expense}</div>
        <div className="card income">Income: ₹{income}</div>
        <div className="card expense">Expense: ₹{expense}</div>

        {/* Form */}
        <div className="card" style={{ color: "black" }}>
          <h3>Add Transaction</h3>

          <select
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <input
            type="number"
            placeholder="Amount"
            onChange={(e) =>
              setForm({ ...form, amount: Number(e.target.value) })
            }
          />

          <input
            placeholder="Category"
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          />

          <button onClick={addTransaction}>Add</button>
        </div>

        {/* List */}
        {transactions.map((t) => (
          <div key={t._id} className="card" style={{ color: "black" }}>
            {t.type} - ₹{t.amount} ({t.category})
            <button onClick={() => deleteTransaction(t._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}