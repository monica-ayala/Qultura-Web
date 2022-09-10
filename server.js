const express= require('express');
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const path = require('path');
var multer = require('multer');
//const csrf = require('csurf');
//const csrfProtection = csrf();

//declarar las rutas
const usuario_routes = require('./routes/usuario_routes');
const museo_routes = require('./routes/museo_routes')
const guia_routes = require('./routes/guia_routes')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(session({
     secret: 'hasuidhqiodjnadcouhanlivunlsauvnsounvauhvudvsnjsdnlviundvkljdnsfovuheovunslkvjndsluvhodafv', 
     resave: false,
     saveUninitialized: false 
 }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'assets')));
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyParser.json());

const storage = multer.diskStorage({
     destination: (request, file, callback) => {
         //'uploads': Es el directorio del servidor donde se subirán los archivos 
         callback(null, 'public/uploads');
     },
     filename: (request, file, callback) => {
         //aquí configuramos el nombre que queremos que tenga el archivo en el servidor, 
         //para que no haya problema si se suben 2 archivos con el mismo nombre concatenamos el timestamp
         callback(null, new Date().getTime() + '-' + file.originalname);
     },
 });

 const fileFilter=(request,file,callback)=>{
     if(file.mimetype==='image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
          callback(null,true);
     }else{
          callback(null,false);
     }
 }

 var upload = multer({
     storage:storage,
     fileFilter:fileFilter
 })

 
app.post('/profile-upload-single', upload.single('profile-file'), function (req, res, next) {
     // req.file is the `profile-file` file
     // req.body will hold the text fields, if there were any
     console.log(JSON.stringify(req.file))
     var response = '<a href="/">Home</a><br>'
     response += "Files uploaded successfully.<br>"
     response += `<img src="${req.file.path}" /><br>`
     return res.send(response)
   })

   
app.post('/profile-upload-multiple', upload.array('profile-files', 12), function (req, res, next) {
     // req.files is array of `profile-files` files
     // req.body will contain the text fields, if there were any
     var response = '<a href="/">Home</a><br>'
     response += "Files uploaded successfully.<br>"
     for(var i=0;i<req.files.length;i++){
         response += `<img src="${req.files[i].path}" /><br>`
     }
     
     return res.send(response)
 })
//  app.post('uploadForm',upload.single('myImg'),async (req,res,next)=>{
//      if(req.file){
//           const pathName=req.file.path;
//           res.send(req.file,pathName)
//      }
//  });
// app.use(csrfProtection); 

// app.use((request, response, next) => {
//      response.locals.csrfToken = request.csrfToken();
//      console.log("aqui inicia")
//      console.log(request.csrfToken());
//      console.log("aqui acaba")
//           next();
//     });


app.use(bodyParser.urlencoded({ extended: false }));

app.use('/usuario', usuario_routes);
app.use('/', museo_routes);
app.use('/museo',museo_routes)
app.use('/guias', guia_routes);



app.use((request, response, next) => {
     response.status(404);
     response.send('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Not found</title></head><body><h1 id="principal">404, esta página no existe</h1></body>');
});

const conn = require('./util/database');


async function main() {
     //Server On
     const port = 8080;
   
     await app.listen(port, async () => {
       console.log(`Server on port http://localhost:${port}`);
     });
   }
   
   main();