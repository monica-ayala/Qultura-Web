const express = require('express');
const router = express.Router();
// const isAuth= require ('../util/is-auth.js')

const guia_controller = require('../controllers/guia_controller');

// EJEMPLOS

router.get('/',guia_controller.view);
router.get('/editar_guia',guia_controller.get_editarGuia);
router.post('/editar_guia',guia_controller.post_editarGuia);
router.get('/agregar_guia',guia_controller.get_agregarGuia);


module.exports = router;