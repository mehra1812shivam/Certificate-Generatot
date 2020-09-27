const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const Certi=require('./info');
const upload=require('./multer');
const mongoose = require('mongoose');
const multer=require('multer');
const jimp=require('jimp');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/certi", {useNewUrlParser: true,useUnifiedTopology:true},()=>{
    console.log("database connected");
});

// Certi.find({"fields.fieldname":"Role"},function(err,certis){
//     console.log(JSON.stringify(certis,null));
//     console.log(certis.template_type);
//     // console.log(JSON.stringify(certis.fieldname,null));
// });

app.get("/creating/:postId", function(req, res){               //here postId is the name of parameter
    const requestedPostId = req.params.postId;
    var fname;
    var cx;
    var cy;
    var value;
    const image= jimp.read(`./uploads/2020-09-27T12-32-25.390ZCertificate of Completion_ 22 Templates in Word Format - Demplates.jpg`);
    const font = jimp.loadFont(jimp.FONT_SANS_32_BLACK);

    Certi.find({_id: requestedPostId}, function(err, certis){
    //   fname=certis.fields[0].fieldname;
      console.log(JSON.stringify(certis,null));
      console.log(certis[0].fields[0].fieldname);
      image.print(font,certis[0].fields[0].coox,certis[0].fields[0].cooy,`${certis[0].fields[0].value}`);
      image.write("newcertificate2.png");
      
      
      
    });
    // Certi.findOne({_id: requestedPostId},'fields.coox', function(err, certis){
    //   cx=certis.fields[0].coox;
    //   console.log(cx);
    // });
    // Certi.findOne({_id: requestedPostId},'fields.cooy', function(err, certis){
    //   cy=certis.fields[0].cooy;
    // });
    // Certi.findOne({_id: requestedPostId},'fields.value', function(err, certis){
    //   value=certis.fields[0].value;
    // });

    // console.log(fname);
    // console.log(cx);
    // console.log(cy);
    // console.log(value);
  
  });

  
app.listen(2000,function(){
    console.log("server started");
});