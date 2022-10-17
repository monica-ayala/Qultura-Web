
const path= require("path");
const multer = require("multer");
const fs = require('fs');
const mkdirp = require("mkdirp");

//set Storage Engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(req.params)
        if (req.params.evento == 'museo') {
          cb(null, "public/uploads/museos"); // it will upload inside test under images
        } else {
          cb(null, "public/uploads/eventos"); // it will upload inside try under images
        }
      },
      filename: (req, file, cb) => {
        if (file.fieldname === "uploadAudio") {
          cb(null, req.params.id_audio);
        }
        else if (file.fieldname === "uploadFile") {
          cb(null, req.params.id_file);
        }
      }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000000000000 //give no. of bytes
    },
    // fileFilter: function(req, file, cb){
    //     checkFileType(file, cb);
    // }
}).single('uploadFile')

exports.uploadFile = (req, res) => {
      upload(req, res, (err) =>{
        if(err){console.log(err);}
    });
}
