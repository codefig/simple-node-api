const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken')
const config = require('config')


const userSchema = new mongoose.Schema({
    name : {
        type : String, 
        required: true, 
        minlength : 5, 
        maxlength : 255, 
    }, 
    email : {
        type : String, 
        required : true, 
        minlength : 5, 
        maxlength : 255, 
        unique : true, 
    }, 
    password : {
        type : String , 
        required : true, 
        minlength: 5, 
        maxlength: 1024
    }, 
    isAdmin : {
        type : Boolean, 
    }
})

userSchema.methods.getAuthToken = function(){
    const token = jwt.sign({_id : this._id,isAdmin : this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
}


const User = mongoose.model("User", userSchema);

function validateUser(user){
    const schema  = {
        name : Joi.string().min(5).max(50).required(), 
        email: Joi.string().min(5).max(255).email().required(), 
        password : Joi.string().min(5).max(1024).required(),
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validateUser = validateUser;