const path= require("path");
const multer = require("multer");
const fs = require('fs');
const mkdirp = require("mkdirp");

// Storage for museums and events
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req.params)
      if (req.params.evento == 'museo') {
        cb(null, "public/uploads/museos"); // it will upload inside museum
      } else {
        cb(null, "public/uploads/eventos"); // it will upload inside events
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


const storage_salas = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(req.params)
        if (req.params.evento == 'museo') {
          cb(null, "public/uploads/museos"); // it will upload inside museum
        } else {
          cb(null, "public/uploads/eventos"); // it will upload inside events
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
    // missing filter for files uploaded
}).single('uploadFile')


const upload_salas = multer({
  storage: storage_salas,
  limits: {
      fileSize: 1000000000000000 //give no. of bytes
  },
  // missing filter for files uploaded
}).fields(
  [
    { 
      name: 'uploadFile', 
      maxCount: 1 
    }, 
    { 
      name: 'uploadAudio', 
      maxCount: 1 
    }
  ])

exports.uploadSalas = (req, res) => {
      upload_salas(req, res, (err) =>{
        if(err){console.log(err);}
    });
}

exports.uploadFile = (req, res) => {
  upload(req, res, (err) =>{
    if(err){console.log(err);}
});
}