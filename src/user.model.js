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
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    uniqueUserId: {
        type: Number
    }
})
// const tokenSchema = new mongoose.Schema({
//     _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
//     token: { type: String, required: true },
//     createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
// });

const User = mongoose.model('User', UserSchema);

module.exports = {User}