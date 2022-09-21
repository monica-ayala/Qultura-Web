const express = require('express');
const router = express.Router();
const filesystem = require('fs');
const path = require('path');
// const isAuth= require ('../util/is-auth.js')
const sala_controller = require('../controllers/sala_controller');
router.get('/',sala_controller.lista);
router.post('/nueva_sala',sala_controller.sala_post);
router.get('/nueva_sala',sala_controller.sala_get);
router.get('/get',sala_controller.api_get_sala);





module.exports = router;