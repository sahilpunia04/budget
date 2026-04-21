require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/transactions", require("./routes/transaction"));

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
);