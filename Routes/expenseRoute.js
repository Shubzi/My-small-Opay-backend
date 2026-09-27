import express from "express";
import { createExpense, getAllExpenses, deleteExpense } from "../Controller/expenseController.js";

const router = express.Router();

router.post("/create-expense", createExpense);      // ✅ Fixed: was /create-expensee (double e)
router.get("/", getAllExpenses);
router.delete("/:id", deleteExpense);

// localhost:5000/api/expense/create-expense
export default router;