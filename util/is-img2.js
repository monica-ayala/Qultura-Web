
var multer = require('multer');


//Middleware para el manejo de las imagenes de guias

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(file)
          cb(null, "public/uploads/guias"); // it will upload inside guias
      },
      filename: (req, file, cb) => {
        cb(null, new Date().getTime()+'-'+file.originalname)
      }
  })



const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000000000000 //give no. of bytes
    },
    // missing filter for files uploaded
}).single('url_imagen')
module.exports = (req, res,next) => {
  upload(req, res,next,(err) =>{
    if(err){console.log(err);}
    console.log(req.body)
    next();
})
}