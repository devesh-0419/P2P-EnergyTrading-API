const express = require('express');
const Joi = require('joi');
const User = require('../models/user');
const Package = require('../models/package');
const router = express();
const {Auth,verifiedNode} = require('../middleware/levelAuth');

router.post('/addpackage',Auth,verifiedNode,async (req,res)=>{
   try {
            let user = await User.findOne({email:req.user});
            if(user){
               
                let package = new Package({
                    ownerId:user._id,
                     price : req.price,
                     duration : req.duration,
                     dailyLimit : req.dailyLimit
                    
                });

               const result =  await package.save();

                res.json({package:result});
            }
            else{
                console.log('user',  user   );
                res.json({message:"user not found"});
                   }
   } catch (e) {
    console.error(e);
   }
});


router.get('/getallpackage',
// Auth,verifiedNode,
async (req,res)=>{
   try {
            let packages = await Package.find()
                                        .select('-_id -unitPrice')
                                        .populate('ownerId','-_id -password -verifiedMail -verifiedContact -buyFrom -sellTo');
            if(packages){
                  res.send(packages);
            }
   } catch (e) {
    console.error(e);
   }
});

module.exports  = router;