const mongoose = require ('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
        minlength:1,
        trim: true
    },
    address: {
        type: String
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = {User}