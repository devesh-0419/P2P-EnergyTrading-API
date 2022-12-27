const mongoose= require('mongoose');

const NotificationSchema=mongoose.Schema({ 
    
        id: {
            type: String
        },
        title: {
            type: String
        },
        subtitle: {
            type: String
        },
        status: {
            type: Boolean,
            default: false
        },
        from :{
            type : String
        },
        to : {
            type : String
        }
});

const Notification = mongoose.model('Notification',NotificationSchema);

module.exports = Notification;