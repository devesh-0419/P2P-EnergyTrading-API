const express = require('express');
const mongoose = require('mongoose');
const signup = require('./routes/signUp');
const login = require('./routes/logIn');
const verifymail = require('./routes/verifyEmail');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cookieParser())

app.use('/api/v1/signup',signup);
app.use('/api/v1/login',login);
app.use('/api/v1/verifymail',verifymail);







mongoose.connect(process.env.URL_DB||'mongodb://localhost:27017/Peer-To-Peer-Energy-Trade',{useNewUrlParser:true,useUnifiedTopology:true}).then(
    app.listen(process.env.PORT||3012,(err)=>{
        if(err) console.error(err);
        else{
            console.log(`Listening to port number ${process.env.PORT} or 3012 and connected to DB`);
        }
    })
).catch(err=>{console.error(err)});