const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
const app = express();
const userRouter = require('./routes/users');


app.use(express.json())
app.use(express.urlencoded())
app.use(bodyparser.urlencoded({extended : true}))

app.use("/api/users", userRouter);

app.get("/", function(req, res){
    return res.send("Welcome to the Users page");
})


const port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log(`application started on port ${port}`);
})