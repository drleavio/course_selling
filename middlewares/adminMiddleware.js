const { Admin } = require("../db/schema");

async function adminMiddleware(req,res,next){
    const username=req.headers.username;
    const password=req.headers.password;
    console.log(username,password);
    
    const admin=await Admin.findOne({
        username,
        password
    })
    console.log(admin);
    
    if(admin){
        console.log(admin);
        next();
    }else{
        return res.json({
            message:"unable to find admin"
        })
    }
}

module.exports=adminMiddleware