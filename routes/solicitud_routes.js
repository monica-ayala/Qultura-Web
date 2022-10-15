const express = require('express');
const router = express.Router();

const solicitud_controller = require('../controllers/solicitud_controller');
const api= require ('../util/is-valid-api.js')

router.get('/getAll/:id_usuario', solicitud_controller.get_solicitudes);

router.post('/cancelar', api, solicitud_controller.elimina_solicitud);

router.post('/nuevaSolicitud', api, solicitud_controller.agrega_solicitud);

router.get('/aceptar/:id_status', solicitud_controller.updateAceptar_solicitud);

router.get('/negar/:id_status', solicitud_controller.updateNegar_solicitud);


module.exports = router;