import { Income } from "../models/income.js";

export const createIncome = async (req, res) => {
    try {
        const { name, amount, category, date, note } = req.body;

        // Validation
        if (!name || !amount) {
            return res.status(400).json({ message: "Name and amount are required." });
        }
        if (isNaN(amount) || Number(amount) <= 0) {
            return res.status(400).json({ message: "Amount must be a positive number." });
        }

        // ✅ Fixed: use a different variable name (newIncome) to avoid shadowing the import
        const newIncome = await Income.create({
            name,
            amount: Number(amount),
            category: category || "other",
            date: date ? new Date(date) : new Date(),
            note: note || ""
        });

        console.log("Income created:", newIncome);

        res.status(201).json({
            message: "Income created successfully",
            income: newIncome   // ✅ Fixed: was returning undefined variable
        });

    } catch (error) {
        console.error("createIncome error:", error.message);
        res.status(500).json({ message: error.message });
    }
};

export const getAllIncome = async (req, res) => {
    try {
        const incomes = await Income.find().sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteIncome = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Income.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: "Income not found." });
        res.status(200).json({ message: "Income deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};