const express = require('express');
const signupServices=require('../services/Signup')


const router = express.Router();

router.post('/signup',signupServices);

module.exports=router;