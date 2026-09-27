import{FakeStore} from '../models/fakestore.js';

export const createFakeStore = async (req, res) =>{
    try{
        const {title, price, rating,count, description, category} = req.body;
        const fakeStore = await FakeStore.create({title, price, rating, count, description, category});
        console.log("Fake Store created successfully", fakeStore);
        res.status(201).json({
            success: true,
            message: "Fake Store created successfully",
            fakeStore
        });
    }catch(error){
       res.status(500).json({message: "Failed to create fake store", error: error.message});
    }
};
export const getFakestores = async (req, res) =>{
    try{
        const fakeStores = await FakeStore.find();
        res.status(200).json({
            success: true,
            message: "Fake Stores retrieved successfully",
            fakeStores
        });
    }catch(error){
        res.status(500).json({message: "Failed to retrieve fake stores", error: error.message});
    }
};

export const deleteFakeStore = async (req, res) =>{
    try{
        const {id} = req.body;
        const fakeStore = await FakeStore.findByIdAndDelete(id);
        if(!fakeStore){
            return res.status(404).json({message: "Fake Store not found"});
        }
        res.status(200).json({
            success: true,
            message: "Fake Store deleted successfully",
            fakeStore   
        });
    }catch(error){
        res.status(500).json({message: "Failed to delete fake store", error: error.message});
    }
};
 
export const updateFakeStore = async (req, res) =>{
    try{
        const {id} = req.body;
        const {title, price, rating, count, description, category } = req.body;
        const fakeStore = await FakeStore.findByIdAndUpdate(id,{title, price, rating, count, description, category}, {new: true});
        if(!fakeStore){
            return res.status(404).json({message: "Fake Store not found"});
        }
        res.status(200).json({
            success: true,
            message: "Fake Store updated successfully",
            fakeStore
        });
    }catch(error){
        res.status(500).json({message: "Failed to update fake store", error: error.message});
    }
};