const user=require('../models/user')
const bcrypt=require('bcryptjs')

const signup= async(req,res)=>{
    try{
        const {name,username,email,password,role}=req.body;
        const existUser=await user.findOne({$or:[{email},{username}]})
        if(existUser){
            return res.status(400).json({message:'User Already Exist'});
        }

        const salt=await bcrypt.genSalt(10);

        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser =new user({
            name,
            username,
            email,
            password:hashedPassword,
            role:role||'default:user'
        })

        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
     } 
    catch(err){
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports=signup;