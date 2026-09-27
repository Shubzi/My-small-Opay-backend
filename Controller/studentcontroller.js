import{Student} from '../models/Student.js';

export const createStudent = async (req, res) =>{
    try{
        const {name, email, grade, age} = req.body;
        const student = await Student.create({name, email, grade, age});
        console.log("Student created successfully", student);
        res.status(201).json({
            success: true,
            message: "Student created successfully",
            student
        });
    }catch(error){
       res.status(500).json({message: "Failed to create student", error: error.message});
    }
};
export const getStudents = async (req, res) =>{
    try{
        const students = await Student.find();
        res.status(200).json({
            success: true,
            message: "Students retrieved successfully",
            students
        });
    }catch(error){
        res.status(500).json({message: "Failed to retrieve students", error: error.message});
    }
};

export const deleteStudent = async (req, res) =>{
    try{
        const {id} = req.body;
        const student = await Student.findByIdAndDelete(id);
        if(!student){
            return res.status(404).json({message: "Student not found"});
        }
        res.status(200).json({
            success: true,
            message: "Student deleted successfully",
            student
        });
    }catch(error){
        res.status(500).json({message: "Failed to delete student", error: error.message});
    }
};
 
export const updateStudent = async (req, res) =>{
    try{
        const {id} = req.body;
        const {name, email, grade, age} = req.body;
        const student = await Student.findByIdAndUpdate(id,{name, email, grade, age}, {new: true});
        if(!student){
            return res.status(404).json({message: "Student not found"});
        }
        res.status(200).json({
            success: true,
            message: "Student updated successfully",
            student
        });
    }catch(error){
        res.status(500).json({message: "Failed to update student", error: error.message});
    }
};