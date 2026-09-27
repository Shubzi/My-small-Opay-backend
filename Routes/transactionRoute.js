import express from 'express';
import {getTransactions, createTransaction, deleteTransaction, updateTransaction} from '../Controller/transactionController.js';

const router = express.Router();

router.get('/transactions', getTransactions);
router.post('/create-transaction', createTransaction);
router.delete('/delete-transaction', deleteTransaction);
router.put('/update-transaction', updateTransaction); 
export default router;