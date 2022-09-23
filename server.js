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
const solicitud_routes = require('./routes/solicitud_routes')
const sala_routes = require('./routes/sala_routes')
const obra_routes = require('./routes/obra_routes')
const evento_routes = require('./routes/evento_routes')
<<<<<<< HEAD
=======

>>>>>>> module2

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

//MULTER 


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + '-' + file.originalname)
  }
})
var upload = multer({ storage: storage })

app.use(upload.single('url_imagen'))
//app.use(upload.single('url_imagenB'))

//MULTER

app.use('/museo',museo_routes)
app.use('/guias', guia_routes);
app.use('/sala', sala_routes);
app.use('/obra', obra_routes);
<<<<<<< HEAD
app.use('/evento',evento_routes);
=======
app.use('/evento', evento_routes);
>>>>>>> module2
app.use('/usuario', usuario_routes);
app.use('/solicitud', solicitud_routes);

app.use('/', museo_routes);

app.use((request, response, next) => {
     response.status(404);
     response.send('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Not found</title></head><body><h1 id="principal">404, esta página no existe</h1></body>');
});

const conn = require('./util/database');
const { request } = require('express');


async function main() {
     //Server On
     const port = 8080;
   
     await app.listen(port, async () => {
       console.log(`Server on port http://localhost:${port}`);
     });
   }
   
   main();