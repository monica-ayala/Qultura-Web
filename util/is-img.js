const express= require('express');
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const path = require('path');
var multer = require('multer');
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv');
const { nextTick } = require('process');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(file)
          cb(null, "public/uploads/eventos"); // it will upload inside events
      },
      filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
      }
  })
  


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000000000000 //give no. of bytes
    },
    // missing filter for files uploaded
}).single('url_imagen')
module.exports = (req, res) => {
  upload(req, res, (err) =>{
    if(err){console.log(err);}
})
next();
}

