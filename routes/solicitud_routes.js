const express = require('express');
const router = express.Router();
const solicitud_controller = require('../controllers/solicitud_controller');
const api= require ('../util/is-valid-api.js')


//Ruta para obtener las solicitudes de un usuario (movil)
router.get('/getAll/:id_usuario', solicitud_controller.get_solicitudes);

//Ruta para poder cancelar las solicitudes
router.post('/cancelar', api, solicitud_controller.elimina_solicitud);

//Ruta al crear una nueva solicitud
router.post('/nuevaSolicitud', api, solicitud_controller.agrega_solicitud);

//Ruta para cambiar los estados de la solicitud (aceptada)
router.get('/aceptar/:id_status', solicitud_controller.updateAceptar_solicitud);

//Ruta para cambiar los estados de la solicitud (rechazada)
router.get('/negar/:id_status', solicitud_controller.updateNegar_solicitud);


module.exports = router;