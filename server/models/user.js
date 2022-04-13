const mongoose = require('mongoose');
const crypto = require('crypto')


// user schema

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:true,
        max:32,
        min:6
    },

    email:{
        type:String,
        trim:true,
        unique:true,
        lowercase:true
    },

    hashed_password:{
        type:String,
        required:true
    },

    salt:String,

    role:{
        type:String,
        default:'subscriber'
    },


    resetPasswordLink:{
        data:String,
        default:''
    }

})


// vitrual





// methods