import express from "express";
import { createIncome, getAllIncome, deleteIncome } from "../Controller/incomeController.js";

const router = express.Router();

router.post("/create-income", createIncome);      // ✅ Fixed: was /create-incomee (double e)
router.get("/", getAllIncome);
router.delete("/:id", deleteIncome);

// localhost:5000/api/income/create-income
export default router;