const express = require('express');
const router = express.Router();
const filesystem = require('fs');
const path = require('path');
// const isAuth= require ('../util/is-auth.js')
const sala_controller = require('../controllers/sala_controller');


router.get('/get',sala_controller.api_get_sala);
router.get('/:id_museo/get',sala_controller.api_get_all_salas);
router.get('/:id_museo/:id_sala/get',sala_controller.api_get_one);



module.exports = router;