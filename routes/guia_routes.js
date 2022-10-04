const express = require('express');
const router = express.Router();
const isAuth= require ('../util/is-auth.js')

const guia_controller = require('../controllers/guia_controller');

// EJEMPLOS

router.get('/', guia_controller.view);
router.get('/editar_guia/:id_guia',guia_controller.get_editarGuia);
router.post('/editar_guia',guia_controller.post_editarGuia);
router.get('/agregar_guia',guia_controller.get_agregarGuia);
router.post('/agregar_guia',guia_controller.post_agregarGuia);
router.get('/eliminar_guia/:id_guia',guia_controller.eliminarGuia)

router.get('/getAll', guia_controller.get_guias);

module.exports = router;