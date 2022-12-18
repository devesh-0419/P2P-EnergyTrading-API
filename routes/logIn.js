const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const {createToken} = require('../controllers/jwtGenerator');
const router = express();

router.post('/',async (req,res)=>{
  try {
           let user = await User.findOne({email:req.body.email})
                                .select('email password verifiedMail isNode');
          console.log('user', user)
           if(user){

               let match=await bcrypt.compare(req.body.password,user.password);
               console.log(match);
               if(match){
               
                const token = createToken(user);
                 res.cookie('jwt',token,{maxAge:3600*1000});
                return res.json({ loggedIn:true, message:'Logged In...'});
               }
           }
           else{

            return res.json({ loggedIn:false, message:'Please check id or password'});
           }
  } catch (e) {
    console.error(e);
    return res.json({ loggedIn:false, message:'Please check id or password'});
  }

});


module.exports=router;