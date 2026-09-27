import express from 'express';
import {getStudents, createStudent, deleteStudent, updateStudent} from '../Controller/studentcontroller.js';

const router = express.Router();

router.get('/students', getStudents);
router.post('/create-student', createStudent);
router.delete('/delete-student', deleteStudent);
router.put('/update-student', updateStudent); 
export default router;