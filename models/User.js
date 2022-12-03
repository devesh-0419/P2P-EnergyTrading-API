const mongoose= require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:256
    },
    email:{
        type:String,
        unique:true,
        required:true,
        maxlength:256,
        minlength:10
    },
    password:{
      type:String,
      required:true
    },
    verifiedMail:{
        type:Boolean,
        default:false
    },
    metaMaskAddress:{
        type:String,
        maxlength:256,
        unique:true,
        sparse:true
    },
    maxOutput:{
        type:Number,
    },
    availableOutput:{
        type:Number,
    },
    contact:{
        type:Number,
    },
    verifiedContact:{
        type:Boolean,
        default:false
    },
    buyFrom:{
        type:[String],

    },
    sellTo:{
        type:[String],

    },
    



});

const User = mongoose.model('User',userSchema);

module.exports = User;