const express = require('express');
const Joi = require('joi');
const User = require('../models/user');
const Package = require('../models/package');
const router = express();
const {Auth,verifiedNode} = require('../middleware/levelAuth');

router.post('/addpackage',Auth,
// verifiedNode,
async (req,res)=>{
   try {
            let user = await User.findOne({email:req.user});
            if(user){
               
                let package = new Package({
                    ownerId:user._id,
                     price : req.body.price,
                     duration : req.body.duration,
                     dailyLimit : req.body.dailyLimit
                    
                });

               const result =  await package.save();

               await User.findOneAndUpdate({email:req.user},{$push : {createdPackages : result._id}},{
                  new: true
              });

                res.json({ isPackageAdded : true, package:result});
            }
            else{
                console.log('user',  user   );
                res.json({ isPackageAdded : false, message:"user not found"});
                   }
   } catch (e) {
    console.error(e);
    res.json({ isPackageAdded : false, message:"user not found"});
   }
});


router.get('/getallpackage',
// Auth,verifiedNode,
async (req,res)=>{
   try {
            let packages = await Package.find()
                                        .select('-_id -unitPrice')
                                        .populate('ownerId','-_id -password -verifiedMail -verifiedContact -buyFrom -sellTo -createdPackages -metaMaskAddress -isNode -contact');
            if(packages){
                  res.send(packages);
            }
   } catch (e) {
    console.error(e);
   }
});

module.exports  = router;