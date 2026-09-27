import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        default: "other"
    },
    date: {
        type: Date,
        default: Date.now
    },
    note: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Income = mongoose.model("Income", incomeSchema);