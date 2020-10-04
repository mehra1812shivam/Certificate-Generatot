const express = require("express");
const multer = require("multer");
// const bodyParser = require("body-parser");
// const router=express.Router()
// const app = express();
// app.use(bodyParser.json());
const mongoose = require("mongoose");
const router=express.Router()
// app.use(bodyParser.json());


// mongoose.connect(
//   "mongodb://localhost:27017/certi",
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   () => {
//     console.log("database connected");
//   }
// );
//schema for template name
var appFormSchema = mongoose.Schema({
  name: {
    type: String,
  },
});
// model for storage template name
const Certitemp = mongoose.model("Certitemp", appFormSchema);

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

router.post('/multer',(req,res)=>{
  upload(req,res,function(err) {
      if(err) {
          console.log(err)
          return res.send('Something went wrong')
      }else{
          var go={
              name:req.file.filename
          }
          var newGo=new Certitemp(go)
          newGo.save().then(()=>{
          console.log("Template created");
          res.send("Done");
  }).catch((err)=>{
      if(err){
          throw err
      }
  });
          
      }
  });    
});
module.exports=upload;
// module.exports=Certitemp;

// module.exports=router
// app.listen(5000, function () {
//   console.log("server started");
// });

module.exports=router
