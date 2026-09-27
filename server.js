import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import incomeRoute from './Routes/incomeRoute.js';
import expenseRoute from './Routes/expenseRoute.js';
import transactionRoute from './Routes/transactionRoute.js';
dotenv.config();

import studentRoutes from './Routes/studentRoutes.js';
import fakestoreRoute from './Routes/fakestoreRoute.js';
const app = express();
app.use(cors({
  origin: ['http://localhost:3000', "https://my-small-opay.vercel.app"], // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization', "X-API-Key"], // Allow these headers
  credentials: true, // Allow cookies to be sent
}));
const PORT = process.env.PORT || 5000;
app.use(express.json());

await connectDB(); // Connect to the database

const aunthenticate = (req, res, next) => {
  const requiredApiKey = process.env.BACKEND_API_KEY;
  const ApiKey = req.headers['x-api-key'];
  if (!ApiKey || ApiKey !== requiredApiKey) {
    return res.status(401).json({ error: "Forbidden: Invalid API key" });
  }
  next();
};
app.use('/api', aunthenticate);
app.use('/api', studentRoutes);
app.use('/api/income', incomeRoute);
app.use('/api/expense', expenseRoute);
app.use('/api', transactionRoute);
app.use('/api', fakestoreRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});