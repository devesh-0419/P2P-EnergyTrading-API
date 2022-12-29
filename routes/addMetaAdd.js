const express = require('express');
const Joi = require('joi');
const User = require('../models/user');
const router = express();
const { Auth, verifiedMail } = require('../middleware/levelAuth');
const { createToken } = require('../controllers/jwtGenerator');

router.post('/addHexAddress', Auth, async (req, res) => {
    try {
        
        let user = await User.findOneAndUpdate({ email: req.user },{metaMaskAddress : req.body.metaMaskAddress,isNode:true});

        if (user) {
            const token = createToken(user);
            res.cookie('jwt', token, { maxAge: 3600 * 1000 });
            res.json({ addressverified: true, message: "Meta mask address is now added can buy and sell" });
        }
        else {

            res.json({ message: "user not found" });
        }
    } catch (error) {
        console.error(error)
    }
});

module.exports = router;