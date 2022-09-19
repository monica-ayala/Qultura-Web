const express = require('express');
const router = express.Router();
const filesystem = require('fs');
const path = require('path');
// const isAuth= require ('../util/is-auth.js')

const museo_controller = require('../controllers/museo_controller');
// EJEMPLOS

router.get('/',museo_controller.lista);
router.get('/get',museo_controller.get_museo);
router.get('/nuevo_museo',museo_controller.get_nuevo)
router.post('/nuevo_museo',museo_controller.museo_post)
router.post('/borrar',museo_controller.soft_erase)
router.get('/registro',museo_controller.register)
router.get('/:id_museo',museo_controller.get_Onemuseo)




module.exports = router;