const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');

mongoose.connect("mongodb://localhost:27017/playground")
.then(function(){
    console.log("Connected to database")
}).catch(err => {
    console.log("Error : " + err);
})

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
    }
})

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

// async function createUser(){
//     const user = new User({
//         name : "Makinde Abbass", 
//         email : "geekyshood@gmail.com",
//         password : "water", 
//     })

//     try {
//         await user.save()
//         console.log("user created");
//     }
//     catch(err){
//         console.log(err.errors);
//     }
// }

// createUser();