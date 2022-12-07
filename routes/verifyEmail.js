const express = require('express');
const User = require('../models/user');
const Otp = require('../models/otp');
const router = express();
const {Auth} = require('../middleware/levelAuth')
const {sendCostumMail}=require('../controllers/mailGenerator');
const otpGenertor =require('../controllers/otpGenertor');
router.post('/sendotp',Auth,async (req,res)=>{
    try {
      let newOtp = otpGenertor()
      const otp = new Otp({
            email : req.user,
            otp: newOtp
      });

        const result =  await otp.save();

      sendCostumMail(req.user,`Your OTP is ${result.otp}`);

      return res.json({message:'otp generated sucessfully'});
    } catch (e) {
      console.error(e);
    }
});

module.exports = router;