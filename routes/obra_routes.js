const express = require('express');
const router = express.Router();
const filesystem = require('fs');
const path = require('path');
// const isAuth= require ('../util/is-auth.js')
const obra_controller = require('../controllers/obra_controller');
router.get('/',obra_controller.lista);
router.post('/nueva_obra',obra_controller.obra_post);
router.get('/nueva_obra',obra_controller.obra_get);
router.get('/get',obra_controller.api_get_obra);





module.exports = router;