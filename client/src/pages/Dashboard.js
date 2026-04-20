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

  // Fetch data on load
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions");
      setTransactions(res.data);
    } catch {
      alert("Error fetching data");
    }
  };

  // Add transaction
  const addTransaction = async () => {
    if (!form.amount || !form.category) {
      return alert("Fill all fields");
    }

    try {
      await API.post("/transactions", form);
      setForm({ type: "expense", amount: "", category: "" });
      fetchTransactions(); // refresh list
    } catch {
      alert("Error adding transaction");
    }
  };

  // Calculate balance
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income - expense;

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      <div className="container">
        {/* Balance Section */}
        <h2>Dashboard</h2>

        <div className="card">
          <h3>Balance: ₹{balance}</h3>
          <p>Income: ₹{income}</p>
          <p>Expense: ₹{expense}</p>
        </div>

        {/* Add Transaction Form */}
        <div className="card">
          <h3>Add Transaction</h3>

          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: Number(e.target.value) })
            }
          />

          <input
            placeholder="Category (Food, Rent, Salary...)"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          />

          <button onClick={addTransaction}>
            Add
          </button>
        </div>

        {/* Transaction List */}
        <h3>Your Transactions</h3>

        {transactions.length === 0 ? (
          <p>No transactions yet</p>
        ) : (
          transactions.map((t) => (
            <div key={t._id} className="card">
              <strong>{t.type.toUpperCase()}</strong>
              <p>₹{t.amount}</p>
              <small>{t.category}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}