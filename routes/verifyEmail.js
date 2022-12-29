const express = require("express");
const User = require("../models/user");
const Otp = require("../models/otp");
const router = express();
const { Auth } = require("../middleware/levelAuth");
const { sendCostumMail } = require("../controllers/mailGenerator");
const otpGenertor = require("../controllers/otpGenertor");
const {createToken} = require('../controllers/jwtGenerator');

// middleware Auth is giving email as req.user

router.post("/sendotp", Auth, async (req, res) => {
  try {
    let newOtp = otpGenertor();
    const otp = new Otp({
      email: req.user,
      otp: newOtp,
    });

    const result = await otp.save();

    await sendCostumMail(req.user, `Your OTP is ${result.otp}. valid for 5 min only`);

    return res.json({ message: "otp generated sucessfully" });
  } catch (e) {
    console.error(e);
  }
});

router.post("/verifymail", Auth, async (req, res) => {
  try {
      console.log('req.user',req.body.otp);
    let newOtp = await Otp.findOne({ email: req.user });
    let user = await User.findOne({ email: req.user });
    if (newOtp||user) {          //   will change the logical operater 
      if (777777 == req.body.otp||newOtp.otp==req.body.otp) { 
            //for testing purpose (because once monica said 7 7 7 7 7 7 ..)
      let user = await User.findOneAndUpdate({ email: req.user },{verifiedMail:true});
        console.log(result);
      //  console.log('data', data);
        const token = createToken(user);
         res.cookie('jwt',token,{maxAge:3600*1000});
        return res.json({ emailverified: "true" });
      } else {
        return res.json({ emailverified: "false", message: "Check otp" });
      }
    } else {
      return res.json({ message: "Regenerate OTP..." });
    }
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;



