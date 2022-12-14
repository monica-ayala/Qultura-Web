// Import modules
const express= require('express');
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const path = require('path');
var multer = require('multer');
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv');

dotenv.config();

const accessTokenSecret = 'youraccesstokensecret';

// Routes
const usuario_routes = require('./routes/usuario_routes');
const museo_routes = require('./routes/museo_routes')
const guia_routes = require('./routes/guia_routes')
const solicitud_routes = require('./routes/solicitud_routes')
const evento_routes = require('./routes/evento_routes')
const sala_routes = require('./routes/sala_routes')
const obra_routes = require('./routes/obra_routes')
const links_routes = require('./routes/links_routes')
const upload_routes = require('./routes/upload_routes')

// Initialize express app
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(session({
     secret: 'qultura-user', 
     resave: false,
     saveUninitialized: false 
 }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// var storage_guias = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().getTime() + '-' + file.originalname)
//   }
// })
// var upload_guiaImage = multer({ storage: storage_guias })
// // var uploadMultiple = upload.fields([{name: 'imagen_limitacion', maxCount: 1}, {name: 'icono_limitacion', maxCount: 1}])

// app.use(upload_guiaImage.single('url_imagen'))
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().getTime() + '-' + file.originalname)
//   }
// })
// var upload = multer({ storage: storage })

// app.use(upload.single('url_imagen'))


// Use routes
app.use('/museo',museo_routes)
app.use('/guias', guia_routes);
app.use('/sala', sala_routes);
app.use('/obra', obra_routes);
app.use('/evento',evento_routes);
app.use('/usuario', usuario_routes);
app.use('/links', links_routes);
app.use('/solicitud', solicitud_routes);
app.use('/uploads',upload_routes)
app.use('/', museo_routes);

app.use((request, response, next) => {
     response.header("Access-Control-Allow-Origin", "*");
     response.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
     response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
     response.status(404);
     response.send('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Not found :(</title></head><body><h1 id="principal">404, esta p??gina no existe</h1></body>');
});


// Database and app port declaration
const conn = require('./util/database');
const { request } = require('express');
const { links } = require('express/lib/response');

async function main() {
     const port = 8080;
   
     await app.listen(port, async () => {
       console.log(`Server on port http://localhost:${port}`);
     });
   }
   
   main();

