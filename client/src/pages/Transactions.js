import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await API.get("/transactions");
    setTransactions(res.data);
  };

  const deleteTransaction = async (id) => {
    await API.delete(`/transactions/${id}`);
    fetchData();
  };

  const filtered =
    filter === "all"
      ? transactions
      : transactions.filter((t) => t.type === filter);

  return (
    <div>
      <Navbar />

      <div className="container">
        <h2>Transactions</h2>

        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {filtered.map((t) => (
          <div key={t._id} className="card" style={{ color: "black" }}>
            {t.type} - ₹{t.amount} ({t.category})
            <button onClick={() => deleteTransaction(t._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}