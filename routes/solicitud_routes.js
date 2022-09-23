const express = require('express');
const router = express.Router();

const solicitud_controller = require('../controllers/solicitud_controller');

router.get('/getAll', solicitud_controller.get_solicitudes);

router.post('/cancelar', solicitud_controller.elimina_solicitud);

router.post('/nuevaSolicitud', solicitud_controller.agrega_solicitud);

module.exports = router;