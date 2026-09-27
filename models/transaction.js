import mongoose from "mongoose";

// Sign convention: positive amount = money in, negative amount = money out.
// Category is free text (e.g. "Work", "Airtime", "Transfer").
const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Please provide an amount"],
      validate: {
        validator: (value) => Number.isFinite(value) && value !== 0,
        message: "Amount must be a non-zero number.",
      },
    },
    category: {
      type: String,
      required: [true, "Please provide a category"],
      trim: true,
      maxlength: [40, "Category is too long (40 characters max)."],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
      trim: true,
      maxlength: [120, "Description is too long (120 characters max)."],
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);