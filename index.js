const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const mongoose = require('mongoose');
const multer=require('multer');
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/certificate", {useNewUrlParser: true,useUnifiedTopology:true},()=>{
    console.log("database connected");
});


mongoose.model("Certificate",{
    template_type:{
        type:String,
        required:true
    },
    template_name:{
        type:String,
        required:true
    },
    template_slug:{
        type:String,
        required:true
    },
    fields:[
        {
            name:{
                type:String,
                required:true
            },
            coox:{
                type:String,
                required:true
            },
            cooy:{
                type:String,
                required:true
            }
        },
        {
            from:{
                type:String,
                required:true
            },
            coorx:{
                type:String,
                required:true
            },
            coory:{
                type:String,
                required:true
            }
        },
        {  
            to:{
                type:String,
                required:true
            },
            coordx:{
                type:String,
                required:true
            },
            coordy:{
                type:String,
                required:true
            }
        },
        {
            role:{
                type:String,
                required:true
            },
            coordix:{
                type:String,
                required:true
            },
            coordiy:{
                type:String,
                required:true
            }
        },
        {
            directorSignature:{
                type:String,
                required:true
            },
            coordinx:{
                type:String,
                required:true
            },
            coordiny:{
                type:String,
                required:true
            }
        }
    ]
});

const Certificate=mongoose.model("Certificate");

app.post('/index',(req,res)=>{
    var go={
        template_type:req.body.template_type,
        template_name:req.body.template_name,
        template_slug:req.body.template_slug,
        fields:req.body.fields
    }
    var newGo=new Certificate(go)
    newGo.save().then(()=>{
        console.log("Template created");
        res.send("Done");
    }).catch((err)=>{
        if(err){
            throw err
        }
    });
});
app.get('/index',(req,res)=>{
    res.json(Certificate);
});
app.listen(5000,function(){
    console.log("server started");
});

