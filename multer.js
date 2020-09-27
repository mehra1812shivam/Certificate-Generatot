const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const mongoose = require('mongoose');
const multer=require('multer');
const jimp=require('jimp');
const { read } = require("jimp");
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(bodyParser.json());


const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename:function(req,file,cb){
        cb(null,new Date().toISOString().replace(/:/g,'-')+file.originalname);

    }
});
const upload=multer({
    storage:storage,

}).single('image');

app.post('/multer',(req,res)=>{
    upload(req,res,function(err) {
        if(err) {
            console.log(err)
            return res.send('Something went wrong')
        }else{
            let check=req.file.filename;
            console.log(req.file);
            res.send("done");
        }
    });    
});
module.exports=upload;

app.listen(5454,function(){
    console.log("server started");
});