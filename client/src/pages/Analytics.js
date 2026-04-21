import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#6c63ff", "#27ae60", "#e74c3c", "#f39c12", "#3498db"];

export default function Analytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/transactions").then((res) => {
      const grouped = {};

      res.data.forEach((t) => {
        if (t.type === "expense") {
          grouped[t.category] = (grouped[t.category] || 0) + t.amount;
        }
      });

      const result = Object.keys(grouped).map((key) => ({
        name: key,
        value: grouped[key],
      }));

      setData(result);
    });
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container">
        <h2>Analytics</h2>

        <PieChart width={400} height={400}>
          <Pie data={data} dataKey="value" outerRadius={150}>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
}