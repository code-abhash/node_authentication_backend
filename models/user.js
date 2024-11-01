const mongoose= require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema=new mongoose.Schema({
    name:
    {
        type:String,
        required:true,
    },
    username:
    {
        type:String,
        required:true,
        unique:true,
    },
    email:
    {
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate:{
            validator:function(v){
                return /^\S+@\S+\.\S+$/.test(v);
            },
        message: props => `${props.value} is not a valid email!`
                }
    },
    password:
    {
        type:String,
        required:true,
        minlength:9,
    },
    role:
    {
        type:String,
        enum:['admin','user'],
        default:'user'
    }
});

// userSchema.pre('save', async function(next){// for next middleware
//     const user=this;// this for a particular user
//     if(!user.isModified('password'))
//         return next();

//     try{
//         const salt=await bcrypt.genSalt(10)
//         user.password= await bcrypt.hash(user.password,salt)
//         next();
//     }
//     catch(err){
//         console.log("Internal server error",err);
//         return next(err);
//     }

// })
module.exports=mongoose.model('User',userSchema)