const express = require('express');
const router = express.Router();

const solicitud_controller = require('../controllers/solicitud_controller');

router.get('/getAll', solicitud_controller.get_solicitudes);

module.exports = router;