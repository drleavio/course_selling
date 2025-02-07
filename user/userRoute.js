// import express from 'express'
// import { Router } from "express";
const {Router}=require('express');
const { User, Course } = require('../db/schema');
const jwt=require('jsonwebtoken');
const userCheck = require('../middlewares/userMiddleware');
const router=Router();


router.post('/login',userCheck,async(req,res)=>{
    const username=req.headers.username;
    
    try {
        const tokenData={username};
        const token=await jwt.sign(tokenData,'password');
        return res.json({
            token,
            message:"loggedin successfully"
        })
    } catch (error) {
        return res.json({
            error,
            message:"error doing signin"
        })
    }
})

router.get('/course',userCheck,(req,res)=>{
    Course.find({}).then((value)=>{
        return res.json({
            value,
            message:"list of courses"
        })
    })
})

router.post('/course/:courseid',userCheck,async(req,res)=>{
        const courseId=req.params.courseid;
        const username=req.headers.username;

        try {
           await User.updateOne({
            username
           },{
            "$push":{
                purchasedCourses:courseId
            }
           })
           return res.json({
            message:"purchased successfully"
           })
        } catch (error) {
            return res.json({
                message:"error doing purchase"
            })
        }
})

router.post('/signup',async(req,res)=>{
    const username=await req.body.username;
    const password=await req.body.password;
    try {
        const userExist=await User.findOne({
            username,
            password
        })
        if(userExist){
            return res.json({
                message:"user already exist"
            }).status(500)
        }
        const user=await User.create({
            username,
            password
        })
        const payloadData={username};
        const token=await jwt.sign(payloadData,"password");
        return res.json({
            token
        }).status(200)
    } catch (error) {
        return res.json({
            message:"error doing signup"
        })
    }
})

module.exports=router