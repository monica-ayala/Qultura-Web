const express = require('express');
const router = express.Router();

const solicitud_controller = require('../controllers/solicitud_controller');

router.get('/getAll/:id_usuario', solicitud_controller.get_solicitudes);

router.post('/cancelar', solicitud_controller.elimina_solicitud);

router.post('/nuevaSolicitud', solicitud_controller.agrega_solicitud);

router.post('/aceptar/:id_status', solicitud_controller.updateAceptar_solicitud);

router.post('/negar/:id_status', solicitud_controller.updateNegar_solicitud);


module.exports = router;