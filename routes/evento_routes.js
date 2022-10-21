const express = require('express');
const router = express.Router();
const filesystem = require('fs');
const path = require('path');
const isAuth= require ('../util/is-auth.js')
const isImg = require('../util/is-img.js')
const event_controller = require('../controllers/evento_controller');

// Evento controller calls
//Ruta para la vista de crear nuevo elemento
router.get('/nuevo_evento',isAuth,event_controller.get_nuevo)

//Ruta para el posteo de los nuevos eventos
router.post('/nuevo_evento',isAuth,isImg,event_controller.post_nuevo)

//Ruta para ejecutar el eliminar eventos
router.post('/borrar/evento/:id_evento',isAuth,event_controller.erase)

// REST API
router.get('/getAll',event_controller.getAll)

module.exports = router;