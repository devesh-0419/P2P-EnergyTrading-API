const mongoose= require('mongoose');

const transactionSchema = mongoose.Schema({
    transactionID:{
        type:String,
        required:true,
        maxlength:256,
       // unique:true        //(unique for every transaction)
    },
    units:{
        type:Number,
        required:true,

    },
    totalPrice:{
        type:Number,
        required:true
    },
    unitPrice:{
        type:Number,
        required:true
    },
    sellerID:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    buyerID:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
 message:{
        type:String,
        required:true,
        default:'Transaction Completed'
    },
    
    packageId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Package',

    }
});

