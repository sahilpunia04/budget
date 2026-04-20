const Transaction = require("../models/Transaction");

// Add transaction
exports.addTransaction = async (req, res) => {
  const newTransaction = new Transaction({
    userId: req.user.id,
    type: req.body.type,
    amount: req.body.amount,
    category: req.body.category,
  });

  await newTransaction.save();
  res.json(newTransaction);
};

// Get transactions
exports.getTransactions = async (req, res) => {
  const data = await Transaction.find({ userId: req.user.id });
  res.json(data);
};