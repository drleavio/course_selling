const express = require('express')
const mongoose=require('mongoose')
const user=require('./user/userRoute')
const admin=require('./admin/adminRoute')


const app=express();
app.use(express.json());

// q0dLAI1pbtB1svAI
// rahulsharma

app.use('/user',user);
app.use('/admin',admin);

const connectDb=async()=>{
    try {
        const response=await mongoose.connect('mongodb+srv://rahulsharma:q0dLAI1pbtB1svAI@cluster0.xibzs.mongodb.net/express_db?retryWrites=true&w=majority&appName=Cluster0');
        console.log('connected');
        
    } catch (error) {
        console.log(error);
        
    }
}
connectDb().then(()=>{
    app.listen(3001,()=>{
        console.log('post listening at port 3001');
        
    })
}).catch((err)=>{
    console.log('server failde',err);
})


