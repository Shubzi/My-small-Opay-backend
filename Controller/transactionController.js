import mongoose from "mongoose";
import { Transaction } from "../models/transaction.js";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const getBalance = async () => {
  const [row] = await Transaction.aggregate([
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);
  return row ? row.total : 0;
};

export const createTransaction = async (req, res) => {
  try {
    const { amount, category, description } = req.body;
    const value = Number(amount);

    // Block spending more than the current balance
    if (value < 0 && Math.abs(value) > (await getBalance())) {
      return res.status(400).json({ message: "Insufficient balance." });
    }

    const transaction = await Transaction.create({
      amount: value,
      category,
      description,
    });

    res
      .status(201)
      .json({ message: "Transaction created successfully", transaction });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res
      .status(200)
      .json({ message: "Transactions retrieved successfully", transactions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.body;
    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid transaction id" });
    }

    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res
      .status(200)
      .json({ message: "Transaction deleted successfully", transaction });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { id, amount, category, description } = req.body;
    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid transaction id" });
    }

    const transaction = await Transaction.findByIdAndUpdate(
      id,
      { amount: Number(amount), category, description },
      { new: true, runValidators: true } // runValidators is off by default on updates
    );
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res
      .status(200)
      .json({ message: "Transaction updated successfully", transaction });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};