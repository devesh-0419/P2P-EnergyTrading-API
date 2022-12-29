const express = require('express');
const Joi = require('joi');
const User = require('../models/user');
const router = express();
const { Auth, verifiedMail } = require('../middleware/levelAuth');

router.post('/updateuseraddress', Auth, async (req, res) => {
    try {
        console.log(req.body);
        await User.findOneAndUpdate({ email: req.user }, req.body, {
            new: true
        });
        res.json({ isUpdateSuccessful: true, message: "successfully updated" })

    } catch (e) {
        res.json({ isUpdateSuccessful: false, message: e.message })

    }
});


router.get('/private/getuserdata', Auth, async (req, res) => {
    try {
        let user = await User.findOne({ email: req.user }).select('-password -_id').populate("createdPackages");
        if (user) {
            res.json({ isError: false ,data : user});
        }
        else {
            res.json({ isError: true });
        }
    } catch (e) {
        res.json({ isError: true });
        console.error(e);
    }
});

router.post('/public/getuserdata', Auth, async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email }).select('-password -_id -notifications -metaMaskAddress -buyFrom -sellTo')
            .populate("createdPackages");
        if (user) {
            res.json(user);
        }
        else {
            res.json({ isError: true });
        }
    } catch (e) {
        res.json({ isError: true });
        console.error(e);
    }
});




module.exports = router