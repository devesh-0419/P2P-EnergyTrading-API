const express = require('express');
const User = require('../models/user');
const router = express();

router.post('/',async (req,res)=>{
    try {
       // console.log('req.body', req.body);
        let user = await User.findOne({email:req.body.email});
        console.log('user', user)
        if(user) return res.json({registered:false,message:"User exist..."}); 
        else {
            user = new User(req.body);
           let result = await user.save();
           return res.send(result); 
        }
    } catch (e) {
        console.error("Error: ",e);
    }
});


module.exports = router;