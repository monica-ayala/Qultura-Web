const express = require('express');
const router = express.Router();
const filesystem = require('fs');
const path = require('path');
// const isAuth= require ('../util/is-auth.js')


const event_controller = require('../controllers/evento_controller');
<<<<<<< HEAD

//router.get('/',museo_controller.lista);
//router.get('/get',museo_controller.get_museo);

router.get('/nuevo_evento',event_controller.get_nuevo)
router.post('/nuevo_evento',event_controller.post_nuevo)
router.post('/borrar/evento/:id_evento',event_controller.erase)


//router.post('/regresar/:id_museo',museo_controller.soft_unerase)
//router.get('/registro',museo_controller.register)
//router.get('/:id_museo',museo_controller.get_Onemuseo)
=======
>>>>>>> module2

//router.get('/',museo_controller.lista);
//router.get('/get',museo_controller.get_museo);

router.get('/nuevo_evento',event_controller.get_nuevo)
router.post('/nuevo_evento',event_controller.post_nuevo)
router.post('/borrar/evento/:id_evento',event_controller.erase)


//router.post('/regresar/:id_museo',museo_controller.soft_unerase)
//router.get('/registro',museo_controller.register)
//router.get('/:id_museo',museo_controller.get_Onemuseo)

module.exports = router;