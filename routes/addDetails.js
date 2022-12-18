const express = require('express');
const Joi = require('joi');
const User = require('../models/user');
const router = express();
const {Auth,verifiedMail} = require('../middleware/levelAuth');

router.post('/addinfo',Auth,verifiedMail,async (req,res)=>{
         try {
   
         } catch (e) {
            
         }
});


router.get('/userdetail',Auth, async (req,res)=>{
    try {
        let user = await User.findOne({email:req.user})
                             .select('-password -_id');
        if(user){
            res.json(user);
        }
    } catch (e) {
        re
        console.error(e);
    }
});




module.exports  = router