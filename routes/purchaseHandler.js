const express = require("express");
const Joi = require("joi");
const User = require("../models/user");
const Package = require("../models/package");
const { sendCostumMail } = require("../controllers/mailGenerator");
const router = express();
const { Auth, verifiedNode } = require("../middleware/levelAuth");


// here buyer is logged in (req.user)  and email is sent to seller (req.body.owner) 
router.post(
  "/purchase",
  Auth,
  // verifiedNode,
  async (req, res) => {
    try {
        
        
      let text = `You have a purchase request from :- ${req.body.name} 
                       contact the Buyer through Email: ${req.user}, Contact: ${req.body.contact}`;

      await sendCostumMail(req.body.owner, text);

      let buyer = await User.findOneAndUpdate({email:req.user},{$push:{buyingRequest:req.body.packageID}});
      let seller = await User.findOneAndUpdate({email:req.body.owner},{$push:{pendingRequest:req.body.packageID}});
      let package = await Package.findByIdAndUpdate(req.body.packageID,{approved:true});
      res.json({purchaseRequest:true});

    } catch (e) {
        console.error(e);
        res.json({purchaseRequest:false});
    }
  }
);



// 
router.post(
  "/sellerconfermation",
  Auth,
  // verifiedNode,
  async (req, res) => {
    try {

        console.log(req.body);
         let buyer = await User.find({buyingRequest:req.body.packageId})
                                .select("email name");
 console.log('buyer', buyer[0].email);
      let text = `Your Purchase request has been accepted by ${req.user} . Please initiate transaction`;
     if (buyer) {
       await sendCostumMail(buyer[0].email, text);
       
        const p = await Package.findByIdAndUpdate(req.body.packageId,{ready:true},{new: true});
        console.log('p', p)
         if(p){
          
       res.json({requestAccepted:true});
         }
        else
        res.json({requestAccepted:false});
     } else {
        res.json({requestAccepted:false});
     }
     

    } catch (e) {
        console.error(e);
        res.json({requestAccepted:false});
    }
  }
);




module.exports = router;