const express = require('express');
const User = require('../models/user');
const router = express();
const {requireAuth} = require('../middleware/levelAuth')

router.post('/',requireAuth,(req,res)=>{
       return res.send('verified user');
});

module.exports = router;