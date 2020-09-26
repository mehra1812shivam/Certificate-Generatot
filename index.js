const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const mongoose = require('mongoose');
const multer=require('multer');
const jimp=require('jimp');
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


mongoose.connect("mongodb://localhost:27017/certificate", {useNewUrlParser: true,useUnifiedTopology:true},()=>{
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

const Certificate=mongoose.model("Certificate",appFormSchema);



app.post('/index',(req,res)=>{
    upload(req,res,function(err) {
        if(err) {
            console.log(err)
            return res.send('Something went wrong')
        }

        else{ 
            var go={
                email:req.body.to,
                template_type:req.body.template_type,
                template_name:req.body.template_name,
                template_slug:req.body.template_slug,
                fields:req.body.fields
            }
            console.log(go);
            console.log(go.fields);
            console.log(go.fields[1].value);
            console.log(go.fields[1].coox);
            
            var newGo=new Certificate(go)
            newGo.save().then(()=>{
                console.log("Template created");
                res.send("Done");
            }).catch((err)=>{
                if(err){
                    throw err
                }
            });
            let check=req.file.filename;
            // res.send("Take this as a response");
            (async function(){
                const image=await jimp.read(`./uploads/${check}`);
                const font =await jimp.loadFont(jimp.FONT_SANS_32_BLACK);
                let i;
                for( i=0;i<(go.fields.length)-1;i++){
                    // console.log(i);
                    // console.log(go.fields[1].coox);
        
                    image.print(font,+go.fields[i+1].coox,+go.fields[i+1].cooy,`${go.fields[i+1].value}`);
        
                }
                
                
                image.write("newcertificate2.png");
            })().catch( e => { console.error(e) });


        }
    });

    
    // var go={
    //     template_type:req.body.template_type,
    //     template_name:req.body.template_name,
    //     template_slug:req.body.template_slug,
    //     fields:req.body.fields
    // }
    // console.log(go.fields[0].value);
    
    // var newGo=new Certificate(go)
    // newGo.save().then(()=>{
    //     console.log("Template created");
    //     res.send("Done");
    // }).catch((err)=>{
    //     if(err){
    //         throw err
    //     }
    // });
    // // res.send("Take this as a response");
    // (async function(){
    //     const image=await jimp.read("./uploads/certifi.png");
    //     const font =await jimp.loadFont(jimp.FONT_SANS_32_BLACK);
    //     var i;
    //     for( i=0;i<go.fields.length;i++){
    //         image.print(font,go.fields[i].coox,go.fields[i].cooy,go.fields[i].value);

    //     }
        
        
    //     image.write("newcertificate1.png");
    // })();




});
app.get('/index',(req,res)=>{
    res.json(Certificate);
});
app.listen(5454,function(){
    console.log("server started");
});