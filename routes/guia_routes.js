const express = require('express');
const router = express.Router();
const isAuth= require ('../util/is-auth.js')
const isImage = require('../util/is-img.js')

const guia_controller = require('../controllers/guia_controller');
const isImg2 = require('../util/is-img2.js');

// Guias controller calls
router.get('/',isAuth,guia_controller.view);
router.get('/editar_guia/:id_guia',isAuth,guia_controller.get_editarGuia);
router.post('/editar_guia', isAuth, isImg2,guia_controller.post_editarGuia);
router.get('/agregar_guia',isAuth, isImg2,guia_controller.get_agregarGuia);
router.post('/agregar_guia',isAuth, isImg2,guia_controller.post_agregarGuia);
router.get('/eliminar_guia/:id_guia',isAuth,guia_controller.eliminarGuia)

// REST API
router.get('/getAll', guia_controller.get_guias);

module.exports = router;