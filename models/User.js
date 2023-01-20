const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 256
    },
    email: {
        type: String,
        unique: true,
        required: true,
        maxlength: 256,
        minlength: 10
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    verifiedMail: {
        type: Boolean,
        default: false
    },
    metaMaskAddress: {
        type: String,
        minlength: 40,
        maxlength: 256,
        // unique: true,
        // sparse: true
    },
    isNode: {
        type: Boolean,
        default: false
    },
    maxOutput: {
        type: Number,
    },
    availableOutput: {
        type: Number,
    },
    contact: {
        type: String,
    },
    verifiedContact: {
        type: Boolean,
        default: false
    },
    buyFrom: {
        type: [String],

    },
    sellTo: {
        type: [String],

    },
    landmark: {
        type: String,

    },
    pincode: {
        type: String
    },
    city: {
        type: String,
    },
    state: {
        type: String,

    },
    country: {
        type: String,

    },
    createdPackages: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        required: true

    }],
    buyingRequest:[{
          type:mongoose.Schema.Types.ObjectId,
          ref: 'Package',
    }],
    pendingRequest:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Package',
  }],

});

const User = mongoose.model('User', userSchema);

module.exports = User;