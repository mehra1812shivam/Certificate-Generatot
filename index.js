const express=require("express");
const bodyParser=require("body-parser");
const app=express();
// const multer=require('multer');
const mongoose = require('mongoose');
const multer=require('./api/multer');
const jimp=require('jimp');
const { read } = require("jimp");
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(bodyParser.json());
const info=require('./api/info');
const upload = require("./api/multer");
// const mul=require('./api/multer');
app.use(upload);
app.use(info);
app.use(multer)

app.listen(2000,function(){
    console.log("server started");
});

