const express = require('express');
const router = express.Router();
const filesystem = require('fs');
const path = require('path');
// const isAuth= require ('../util/is-auth.js')
const museo_controller = require('../controllers/museo_controller');
router.get('/',museo_controller.lista);
router.get('/get',museo_controller.get_museo);
router.get('/nuevo_museo',museo_controller.get_nuevo)
router.post('/nuevo_museo',museo_controller.museo_post)
router.post('/borrar/:id_museo',museo_controller.soft_erase)
router.post('/regresar/:id_museo',museo_controller.soft_unerase)
router.get('/registro',museo_controller.register)
router.get('/:id_museo',museo_controller.get_Onemuseo)




module.exports = router;