const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const {createToken} = require('../controllers/auth');
const router = express();

router.post('/',async (req,res)=>{
  try {
           let user = await User.findOne({email:req.body.email})
                                .select('email password verifiedMail isNode');
          // console.log('user', user)
           if(user){
               let match=await bcrypt.compare(req.body.password,user.password);
               if(match){
                const data= {
                    email:user.email,
                    verifiedMail:user.verifiedMail,
                    isNode:user.isNode
                };
              //  console.log('data', data);
                const token = createToken(data);
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