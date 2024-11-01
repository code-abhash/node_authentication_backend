const express=require('express');
const LoginService = require('../services/Login');

const router = express.Router();

router.post('/login',LoginService);

module.exports=router;