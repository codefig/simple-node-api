const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
const auth = require('./routes/auth')
const userRouter = require('./routes/users');
const config = require('config')

const moviesRouter = require('./routes/movies')
const app = express();

if(!config.get('jwtPrivateKey')){
    console.log("FATAL ERROR !jwtPrivatekey not defined")
    process.exit(1);
}

mongoose.connect("mongodb://localhost:27017/playground")
.then(function(){
    console.log("Connected to database")
}).catch(err => {
    console.log("Error : " + err);
})


app.use(express.json())
app.use(express.urlencoded())
app.use(bodyparser.urlencoded({extended : true}))

app.use("/api/users", userRouter);
app.use('/api/auth', auth);
app.use('/api/movies', moviesRouter);

app.get("/", function(req, res){
    return res.send("Welcome to the Users page");
})


const port = process.env.PORT || 3000;


app.listen(port, function(){
    console.log(`application started on port ${port}`);
})