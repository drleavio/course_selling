// import express from 'express'
// import { Router } from 'express';
const {Router}=require('express');
const jwt = require('jsonwebtoken')
const adminMiddleware = require('../middlewares/adminMiddleware');
const { Admin, Course } = require('../db/schema');
const router=Router();


router.post('/signin',async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const payloadData={
        username
    }
    const token= jwt.sign(payloadData,"password");
    return res.json({
        token
    }).status(200)
})

router.post('/signup',(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    Admin.findOne({
        username,
        password
    }).then((value)=>{
        console.log(value);
        
        if(value){
            return res.json({
                message:"user already exist"
            })
        }else{
            Admin.create({
                username,
                password
            }).then(()=>{
                const payloadData={
                    username
                }
                const token=jwt.sign(payloadData,"password");
                return res.json({
                    token,
                    message:"user created successfully"
                })
            }).catch((error)=>{
                console.log(error);
                
                return res.json({
                    message:"error doing signup"
                })
            })
        }
    })
})
router.get('/courses',adminMiddleware,(req,res)=>{
        Course.find().then((data)=>{
            return res.json({
                data
            })
        }).catch((error)=>{
            return res.json({
                error,
                message:"error fetching data"
            })
        })
})
router.post('/courses',adminMiddleware,async(req,res)=>{
    const title=req.body.title;
    const description=req.body.description;
    const author=req.body.author;
    const price=req.body.price;
    const newCourse=await Course.create({
        title,
        description,
        author,
        price
    })
    return res.json({
        courseId:newCourse._id,
        message:"course created successfully"
    })
})

module.exports=router;