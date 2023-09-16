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
    profile : {
        type : String,
        required : true
    },
    password : {
        type : String,
        require : true
    },
    is_admin : {
        type : Number,
        require : true
    },
    is_verified : {
        type : Number,
        default : 0
    }

});

module.exports = mongoose.model('userdetils',Userschema);