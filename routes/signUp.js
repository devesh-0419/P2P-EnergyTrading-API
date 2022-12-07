const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const {createToken} = require('../controllers/jwtGenerator');
const router = express();

router.post('/',async (req,res)=>{
    try {
       // console.log('req.body', req.body);
        let user = await User.findOne({email:req.body.email});
        //console.log('user', user)
        if(user) return res.json({registered:false,message:"User exist..."}); 
        else {
            let saltRound=10;
         bcrypt.hash(req.body.password,saltRound).then(async(hash)=>{
                req.body.password=hash;
               // console.log('req.body.password', req.body.password);
                user = new User(req.body);
                await user.save();
        
              //  console.log('data', data);
                const token = createToken(user);
                 res.cookie('jwt',token,{maxAge:3600*1000});
                return res.json({
                    signedUp:true
                   }); 
            });
            
         
           
        }
    } catch (e) {
        console.error("Error: ",e);
    }
});


module.exports = router;