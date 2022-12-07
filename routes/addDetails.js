const express = require('express');
const User = require('../models/user');
const router = express();
const {Auth,verifiedMail} = require('../middleware/levelAuth');

router.post('/',Auth,verifiedMail,async (req,res)=>{
         
});