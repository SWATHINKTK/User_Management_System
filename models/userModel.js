const mongoose = require('mongoose');

const Userschema = mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    is_admin : {
        type : Number,
        required : true
    },
    is_verified : {
        type : Number,
        default : 0
    }

});

module.exports = mongoose.model('userdetils',Userschema);