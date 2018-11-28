const {User, validateUser} = require('../models/user');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt')


router.post('/', async function(req, res){
    // console.log(req.body);
    const {error} = validateUser(req.body);
    if(error) {
        return res.status(404).send(error.details[0].message);
    }

    // User.findOne({email: req.body.email}, function(err,result){
    //     if(err) {
    //         console.log(err);
    //         res.status(404).send(err);
    //     }

    //     else if(result){
    //         console.log("User already exist");
    //         res.status(404).send("Username already exist");
    //     }

    // })

    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send("User record already exist");
    
    //not yet registerd 
    result  = new User({
        name : req.body.name, 
        email : req.body.email, 
        password : req.body.password,
    })

    let salt = await bcrypt.genSalt(5)
    result.password = await bcrypt.hash(result.password, salt);

    await result.save();
    console.log("User account created")
   
    res.send(_.pick(result, ['name', 'email', '_id']));
})

module.exports = router;