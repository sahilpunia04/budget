const router = require("express").Router();
const auth = require("../middleware/auth");

const {
  addTransaction,
  getTransactions,
} = require("../controllers/transactionController");

const Transaction = require("../models/Transaction");

// Add
router.post("/", auth, addTransaction);

// Get
router.get("/", auth, getTransactions);

// ✅ DELETE (THIS WAS MISSING)
router.delete("/:id", auth, async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;