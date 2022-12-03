const express = require('express');
const mongoose = require('mongoose');
const signup = require('./routes/signUp');
const app = express();
require('dotenv').config();

app.use(express.json());


app.use('/api/v1/signup',signup);







mongoose.connect(process.env.URL_DB||'mongodb://localhost:27017/Peer-To-Peer-Energy-Trade').then(
    app.listen(process.env.PORT||3012,(err)=>{
        if(err) console.error(err);
        else{
            console.log(`Listening to port number ${process.env.PORT} or 3012 and connected to DB`);
        }
    })
).catch(err=>{console.error(err)});