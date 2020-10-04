// const express=require("express");
// // const bodyParser=require("body-parser");
// const app=express();
// const mongoose = require('mongoose');
// // const multer=require('./api/multer');
// // const jimp=require('jimp');
// // const { read } = require("jimp");
// // const create=require('./api/creating')
// const info=require('./api/info');
// const upload = require("./api/multer");
// const multer = require("multer");
//  app.use(creating);
//  app.use(info);
//  app.use(multer)

const express=require("express");
const app=express();

const multerroute=require('./api/multer')
const info=require('./api/info')
const create=require('./api/creating')

const bodyParser=require("body-parser");


    
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.use(info)
app.use(multerroute)
app.use(create)

app.listen(5000,function(){
    console.log("server started");
});

