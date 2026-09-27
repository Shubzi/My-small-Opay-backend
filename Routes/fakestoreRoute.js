import express from 'express';
import {getFakestores, createFakeStore, deleteFakeStore, updateFakeStore} from '../Controller/fakestorecontroller.js';

const router = express.Router();
router.get('/fakestores', getFakestores);
router.post('/create-fakestore', createFakeStore);
router.delete('/delete-fakestore', deleteFakeStore);
router.put('/update-fakestore', updateFakeStore); 
export default router;