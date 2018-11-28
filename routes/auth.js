const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt')
const Joi = require('joi')
const jwt = require('jsonwebtoken');

//configuration settings 
const config = require('config')

router.post('/', async function(req, res){
    // console.log(req.body);
    const {error} = validate(req.body);
    if(error) {
        return res.status(404).send(error.details[0].message);
    }

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Invalid email or password combination ");
    
    //not yet registerd 
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send("Invalid email or password combination ");

    const token = user.getAuthToken();
    res.send(token);
})


function validate(req){
    const schema  = {
        email: Joi.string().min(5).max(255).email().required(), 
        password : Joi.string().min(5).max(1024).required(),
    };

    return Joi.validate(req, schema);
}

module.exports = router;