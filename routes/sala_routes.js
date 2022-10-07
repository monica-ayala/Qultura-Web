const express = require('express');
const router = express.Router();
const filesystem = require('fs');
const path = require('path');
const sala_controller = require('../controllers/sala_controller');

// REST API
router.get('/get',sala_controller.api_get_sala);
router.get('/:id_museo/getSalas',sala_controller.api_get_all_salas);
router.get('/:id_sala/getSala',sala_controller.api_get_one);

module.exports = router;