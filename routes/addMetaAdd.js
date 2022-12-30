const express = require('express');
const Joi = require('joi');
const User = require('../models/user');
const router = express();
const {Auth,verifiedMail} = require('../middleware/levelAuth');

router.post('/addHexAddress',Auth,verifiedMail,async(req,res)=>{
    try {
        let user = await User.find({email:req.user});
        if(user){
            user.metaMaskAddress=req.body.metaMaskAddress;
            user.isNode = true;
            const result = await user.save();
            const token = createToken(user);
         res.cookie('jwt',token,{maxAge:3600*1000});
         res.json({addressverified:true,message:"Meta mask address is now added can buy and sell"});
        }
        else{

            res.json({message:"user not found"});
        }
    } catch (error) {
        console.error(error)
    }
})