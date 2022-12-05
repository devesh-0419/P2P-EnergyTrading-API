const express = require('express');
const User = require('../models/user');
const router = express();
const {Auth} = require('../middleware/levelAuth')

router.post('/',Auth,(req,res)=>{
       return res.send('verified user');
});

module.exports = router;