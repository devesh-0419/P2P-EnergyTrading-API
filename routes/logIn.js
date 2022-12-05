const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const {createToken} = require('../controllers/auth');
const router = express();

router.post('/',async (req,res)=>{
  try {
           let user = await User.findOne({email:req.body.email});
           console.log('user', user)
           if(user){
               let match=await bcrypt.compare(req.body.password,user.password);
               if(match){
                const token = createToken(user.email);
                 res.cookie('jwt',token,{maxAge:3600*1000});
                return res.json({message:'Logged In...'});
               }
           }
           else{
            return res.json({message:'Please check id or password'});
           }
  } catch (e) {
    console.error(e);
  }

});


module.exports=router;