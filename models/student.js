import mongoose from "mongoose";
import validator from "validator";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required:[true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: [true, "Email already exists"],
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email"
    }
  },
  grade:{
    required: [true, "Please provide a grade"],
    type: [Number, "Please provide a valid grade"],
    enum: {
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      message: "Grade must be between 1 and 12"
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  age: {
    type: Number,
    required: [true, "Please provide an age"]
  }
});

export const Student = mongoose.model("Student", studentSchema);