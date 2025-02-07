const { User } = require("../db/schema");

const userCheck=async(req,res,next)=>{
    const username=req.headers.username;
    const password=req.headers.password;
    const userexist=await User.findOne({
        username,
        password,
    })
    if (userexist) {
        next();
    }else{
        return res.json({
            message:"user does not exist"
        })
    }
}

module.exports=userCheck