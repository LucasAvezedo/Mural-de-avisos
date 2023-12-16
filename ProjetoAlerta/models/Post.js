const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {type: String, required : true, maxlength:40},
    desc: String,
    time: {type: String, required: true},
    user: {type: String, required: true}
    

})

module.exports = mongoose.model('Posts', postSchema)