const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { createToken } = require('../controllers/jwtGenerator');
const Joi = require('joi');
const { schema } = require('../models/user');
const router = express();

router.post('/', async (req, res) => {
    try {

        const Schema = {
            name: Joi.string().min(3).max(256).required(),
            password: Joi.string().min(6).max(256).required(),
            email: Joi.string().min(3).max(256).required().email()
        };

        let result = Joi.valid(req.body, schema);



        // console.log('req.body', result);
        let user = await User.findOne({ email: req.body.email });
        //console.log('user', user)
        if (user) return res.json({ isError:true, signedUp: false, message: "User exist..." });
        else {
            
            let saltRound = 10;
            bcrypt.hash(req.body.password, saltRound).then(async (hash) => {
                req.body.password = hash;
                console.log('req.body.password', req.body.password);
                user = new User(req.body);
                await user.save();

                //  console.log('data', data);
                const token = createToken(user);
                res.cookie('jwt', token, { maxAge: 3600 * 1000 });
                return res.json({
                    jwt : token,
                    isError:false,
                    signedUp: true
                });
            });



        }
    } catch (e) {
        console.error("Error: ", e);
        res.json({
            isError:true,
            signedUp: false
        })
    }
});


module.exports = router;