const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware, function(req, res, next){
    const movies = [
        {"name" : "Venom", "year": "2018"}, 
        {"name": "Big bang theory", "year": "2015"},
    ]
    res.send(movies);
})

module.exports = router;