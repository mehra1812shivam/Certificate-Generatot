const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const Certitemp=require('./multer');
const Certi=require('./info');
const upload=require('./multer');
const mongoose = require('mongoose');
const multer=require('multer');
const jimp=require('jimp');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(bodyParser.json());
//connecting to database
mongoose.connect("mongodb://localhost:27017/certi", {useNewUrlParser: true,useUnifiedTopology:true},()=>{
    console.log("database connected");
});

// Certi.find({"fields.fieldname":"Role"},function(err,certis){
//     console.log(JSON.stringify(certis,null));
//     console.log(certis.template_type);
//     // console.log(JSON.stringify(certis.fieldname,null));
// });
var fetchedData={};  //object to store templatename
var field_name="";
var x_coor=0;
var y_coor=0;
var field_value="";

app.get("/creating/:postId/:tempId", function(req, res){               //here postId is the name of parameter
    const requestedPostId = req.params.postId;  //takes id passed in parameter
    const requestedtempId = req.params.tempId;
    
    
    //This finds the template name with id passed in the url
    Certitemp.find({_id:requestedtempId},function(err,certitemps){
        // console.log(JSON.stringify(certitemps,null));
        // console.log(certitemps[0].name);
        fetchedData.tempname=`${certitemps[0].name}`;
        Storetemplatename();
        
    });
    
    //This fetches all the entered fields for the id passed.
    Certi.find({_id: requestedPostId}, function(err, certis){
        // console.log(certis[0].fields.length);
    
    //   console.log(JSON.stringify(certis,null));
      var i;
      //loop to print values on certificate
      
      for(i=0;i<certis[0].fields.length;i++){
        // field_name=certis[0].fields[i].fieldname;
        // x_coor=certis[0].fields[i].coox;
        // y_coor=certis[0].fields[i].cooy;
        // field_value=certis[0].fields[i].value;


        //printing values on fields
        Printcertificate(certis[0].fields[i].coox,certis[0].fields[i].cooy,certis[0].fields[i].value); 
         
      }
           
    
      
      
      
    });
    //to store template name to be used as global
    function Storetemplatename(){
        var a=`${fetchedData.tempname}`;
        return a;
    }
    // to print the certificate
    function Printcertificate(x_coor,y_coor,field_value){
        var b=Storetemplatename();
        (async function(){
            const image=await jimp.read("../uploads/certifi.png");
            const font =await jimp.loadFont(jimp.FONT_SANS_32_BLACK);
            
            image.print(font,x_coor,y_coor,`${field_value}`);
            image.write("newcertificate2.png");
            

            
            
        })().catch((err)=>{
            if(err){
                throw err
            }
        });
       
  
        
        

    }

    
    

    
  
  });

  
app.listen(2000,function(){
    console.log("server started");
});