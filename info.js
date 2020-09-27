const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const mongoose = require('mongoose');
const multer=require('multer');
const jimp=require('jimp');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/certi", {useNewUrlParser: true,useUnifiedTopology:true},()=>{
    console.log("database connected");
});
var appFormSchema =mongoose.Schema({
    email:{
        type:String
    },
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
            fieldname:{
                type:String,
            
            },
            coox:{
                type:Number,
                
            },
            cooy:{
                type:Number,
                
            },
            value:{
                type:String
            }
        },{strict:false}
    ]
},{strict:false});

const Certi=mongoose.model("Certi",appFormSchema);

app.post('/info',(req,res)=>{
    var go={
        email:req.body.email,
        template_type:req.body.template_type,
        template_name:req.body.template_name,
        template_slug:req.body.template_slug,
        fields:req.body.fields
    }
    console.log(go);
    console.log(go.fields);
    
    var newGo=new Certi(go)
    newGo.save().then(()=>{
        console.log("Template created");
        res.send("Done");
    }).catch((err)=>{
        if(err){
            throw err
        }
    });

});

app.listen(5000,function(){
    console.log("server started");
});

module.exports=Certi;
