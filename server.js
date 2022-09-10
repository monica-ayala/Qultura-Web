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
     destination: path.join(__dirname,'/public/uploads/') ,
     filename: function(req, file, cb){
         cb(null, new Date().getTime() + '-' + file.originalname);
     }
 })
 
 const upload = multer({
     storage: storage,
     limits: {
         fileSize: 1000000 //give no. of bytes
     },
 }).single('uploadFile');

 function uploadFile(req, res){
     upload(req, res, (err) =>{
          console.log(res.req.file.filename)
         if(err){
             //Send error msg
             console.log(err);
         }else{
             //send correct msg
             //res.send()
             res.send('Successful');
         }
     //     res.status(200).json({
     //      filename: 
     //  });
     });
     
     
 }

 app.post('/upload', uploadFile)


app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', museo_routes);
app.use('/museo',museo_routes)
app.use('/guias', guia_routes);

app.use('/usuario', usuario_routes);

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