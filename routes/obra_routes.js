const express = require('express');
const router = express.Router();
const filesystem = require('fs');
const path = require('path');
// const isAuth= require ('../util/is-auth.js')
const obra_controller = require('../controllers/obra_controller');
router.get('/get',obra_controller.api_get_obra);
router.get('/:id_sala/getObras',obra_controller.api_get_all_obras);
router.get('/:id_obra/getObra',obra_controller.api_get_one);
module.exports = router;