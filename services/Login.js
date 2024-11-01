const User= require('../models/user');
const bcrypt=require('bcryptjs');
const jwtAuth = require('jsonwebtoken')

const login =async(req,res)=>{
    try{
        const{username,password}=req.body;

        const user=await User.findOne({username});
        if(!user){
            return res.status(404).json({message:'User donot exist with the following credentials'})
        }

        const validPassword= await bcrypt.compare(password,user.password);

        if(!validPassword){
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token =jwtAuth.sign({
            id:user._id, role:user.role
        },'secret123',{expiresIn:'5h'});

        res.status(200).json({
            message:'Login Successful',
            token,
            user: { id: user._id, username: user.username, role: user.role }
        })
    }
    catch(err){
        console.log("Error",err)
        return res.status(500).json({message:'login failed!!'})
    }
}

module.exports=login;