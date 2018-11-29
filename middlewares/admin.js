const jwt = require('jsonwebtoken');
const config = require('config');


function admin(req, res, next){

    if(!req.user.isAdmin){
        return res.status(403).send("Access denied, Only administrators can visit the page");
    }

    next();
}

module.exports = admin