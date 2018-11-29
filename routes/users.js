const {User, validateUser} = require('../models/user');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const authMiddleware = require('../middlewares/auth')
const adminMiddleware = require('../middlewares/admin');

router.get('/admin', [authMiddleware, adminMiddleware],function(req, res, next){
    console.log(req.user._id);
    res.send("Welcome to the admin section");
})

router.get('/me', authMiddleware, async function(req, res){
    console.log(req.user._id);
    // res.send("welcome");
    const user = await User.findById(req.user._id).select('-password');
    return res.send(user);
})
router.post('/', async function(req, res){
    // console.log(req.body);
    const {error} = validateUser(req.body);
    if(error) {
        return res.status(404).send(error.details[0].message);
    }

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
    
    // const token = jwt.sign({_id : result._id}, config.get('jwtPrivateKey'));
    const token = result.getAuthToken();
    res.header('x-auth-token',token).send(_.pick(result, ['name', 'email', '_id']));
})

module.exports = router;