const router = require("express").Router();
const Transaction = require("../models/Transaction");
const auth = require("../middleware/auth");
const {
  addTransaction,
  getTransactions,
} = require("../controllers/transactionController");
// Add transaction
router.post("/", auth, async (req, res) => {
  const t = new Transaction({ ...req.body, userId: req.user.id });
  await t.save();
  res.json(t);
});

// Get all
router.get("/", auth, async (req, res) => {
  const data = await Transaction.find({ userId: req.user.id });
  res.json(data);
});

module.exports = router;