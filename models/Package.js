const mongoose= require('mongoose');

const packageSchema = mongoose.Schema({
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    unitPrice:{      // calc while creating Price of 1 unit of electricity
        type:Number,
    },
    duration:{
        type:Number,  //(take month(28), week(7))
    
    },
    dailyLimit:{
        type:Number,
    },
    price:{     //price of Package
        type:Number,
    },
    active:{      //SOLD or NOT
        type:Boolean,
        default:true
    },

});

const Package = mongoose.model('Package',packageSchema);

module.exports = Package;