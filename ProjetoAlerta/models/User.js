const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {type: String, required: true, minlength: 4, maxlength: 30},
    email: {type: String, required: true , minlength: 10, maxlength: 40},
    password: {type: String, required: true, minlength: 6, maxlength: 150},
    mod: {type: Boolean, default: false},
    admin: {type: Boolean, default: false},
    idmod: {type: String,maxlength: 10} 
})


module.exports = mongoose.model('User', userSchema)