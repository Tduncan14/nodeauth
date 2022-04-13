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

},{timestamps:true})


// vitrual and saving the password in the database
userSchema.virtual('password')
.set( function(password){
    this._password = password
    // generate salt for the password
    this.salt = this.makeSalt()

    this.hashed_password = this.encryptPassword(password)
})
.get(function(){
    return this._password
})




// methods
userSchema.methods = {

    authenicate:function(plainPassword){

        return this.encryptPassword(plainPassword) = this.hashed_password;

    },

    encryptPassword:function(password){
        if(!password){
            return ''
        }

        try{

            return crypto.createHmac('sha1',secret)
            .update(password)
            .digest('hex')


        }

        catch(err){
            return err
        }

    },

    makeSalt:function(){
        return Math.round(new Date().valueOf()*Math.random()) + ''
    }




}



module.exports = mongoose.model('User',userSchema)