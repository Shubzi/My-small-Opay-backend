import mongoose from "mongoose";
import validator from "validator";

const FakeStoreSchema = new mongoose.Schema({
  title: {
    type: String,
    required:[true, "Please provide a title"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a price"],
    min: [0, "Price cannot be negative"]
  },
  rating: {
    type: Number,
    required: [true, "Please provide a rating"],
    min: [0, "Rating cannot be negative"],
    max: [5, "Rating cannot be more than 5"]
  },
  count:{
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

    description:{
    required: [true, "Please provide a description"],
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    required: [true, "Please provide a category"]
  }
});

export const FakeStore = mongoose.model("FakeStore", FakeStoreSchema);