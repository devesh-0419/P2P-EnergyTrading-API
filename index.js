const express = require("express");
const mongoose = require("mongoose");
const signup = require("./routes/signUp");
const login = require("./routes/logIn");
const verifymail = require("./routes/verifyEmail");
const userDetails = require("./routes/userProfileRoutes");
const packages = require("./routes/addPackage");
const addMetaAddress = require('./routes/addMetaAdd');

const cookieParser = require("cookie-parser");
const cors =require('cors')
const app = express();
require("dotenv").config();

mongoose.set('strictQuery', true);

app.use(express.json());
app.use(cookieParser());


//cors 


  const whitelist = ['https://eccentricstore.netlify.app','http://localhost:3000','http://192.168.43.230:19006','http://127.0.0.1:5173']

app.use(cors({
    origin:whitelist,
credentials:true
}));


app.use("/api/v1/signup", signup);
app.use("/api/v1/login", login);
app.use("/api/v1", verifymail);
app.use("/api/v1", userDetails);
app.use("/api/v1",packages);
app.use("/api/v1",addMetaAddress);

process.on('uncaughtException', function (err) {
  console.log('uncaughtException',err);
}); 


mongoose
  .connect(
    process.env.URL_DB || "mongodb://localhost:27017/Peer-To-Peer-Energy-Trade",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(
    app.listen(process.env.PORT || 3012, (err) => {
      if (err) console.error(err);
      else {
        console.log(
          `Listening to port number ${process.env.PORT} or 3012 and connected to DB`
        );
      }
    })
  )
  .catch((err) => {
    console.error(err);
  });
