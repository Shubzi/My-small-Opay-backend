import { Expense } from "../models/expense.js";

export const createExpense = async (req, res) => {
    try {
        const { name, amount, category, date, note } = req.body;

        // Validation
        if (!name || !amount) {
            return res.status(400).json({ message: "Name and amount are required." });
        }
        if (isNaN(amount) || Number(amount) <= 0) {
            return res.status(400).json({ message: "Amount must be a positive number." });
        }

        // ✅ Fixed: use newExpense to avoid shadowing the Expense import
        const newExpense = await Expense.create({
            name,
            amount: Number(amount),
            category: category || "other",
            date: date ? new Date(date) : new Date(),
            note: note || ""
        });

        console.log("Expense created:", newExpense);

        res.status(201).json({
            message: "Expense created successfully",
            expense: newExpense  // ✅ Fixed: was returning undefined 'income' variable
        });

    } catch (error) {
        console.error("createExpense error:", error.message);
        res.status(500).json({ message: error.message });
    }
};

export const getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Expense.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: "Expense not found." });
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};