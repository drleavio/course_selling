// import mongoose from "mongoose";
const mongoose=require('mongoose')


const userSchema=new mongoose.Schema({
    username:String,
    password:String,
    purchasedCourses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course'
        }
    ]
})

const adminSchema=new mongoose.Schema({
    username:String,
    password:String,
})

const courseSchema=new mongoose.Schema({
    title:String,
    description:String,
    author:String,
    price:Number
})

const Admin=mongoose.model('Admin',adminSchema);
const User=mongoose.model('User',userSchema);
const Course=mongoose.model('Course',courseSchema);

module.exports={
    Admin,User,Course
}