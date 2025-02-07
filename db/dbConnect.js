// import mongoose from "mongoose";
const mongoose=require('mongoose')

const connectDb=async()=>{
    try {
        const response=await mongoose.connect('mongodb+srv://rahulsharma:q0dLAI1pbtB1svAI@cluster0.xibzs.mongodb.net/express_db?retryWrites=true&w=majority&appName=Cluster0');
        console.log(response);
        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports=connectDb