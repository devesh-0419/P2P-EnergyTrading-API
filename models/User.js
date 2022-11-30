const mongoose= require('mongoose');

const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:256
    },
    metaMaskAddress:{
        type:String,
        maxlength:256
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
    buyFrom:{
        type:[String],

    },
    sellTo:{
        type:[String],

    },
    



});

const User = mongoose.model('User',UserSchema);

module.exports = User;