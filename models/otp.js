const mongoose= require('mongoose');

const otpSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        maxlength:256,
        minlength:10
    },

    otp:{
        type:Number,
    required:true
    },

    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: '5m' },
      },
   
    




});

const Otp = mongoose.model('Otp',otpSchema);

module.exports = Otp;