const mongoose = require ('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName:{
        type: String,
        // required: true,
        // minlength:1,
        // trim: true
    },
    lastName: {
        type: String
    },
    address: {
        type: String
    },
    emailID: {
        type: String
    },
    mobileNumber: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    lastDonated: {
        type: String
    }
    

})

const User = mongoose.model('User', UserSchema);

module.exports = {User}