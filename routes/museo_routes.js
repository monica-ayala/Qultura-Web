const express = require('express');
const router = express.Router();
const filesystem = require('fs');
const path = require('path');
const isAuth= require ('../util/is-auth.js')
const museo_controller = require('../controllers/museo_controller');

// Museo controller calls
router.get('/',isAuth,museo_controller.lista);
router.get('/nuevo_museo',isAuth,museo_controller.get_nuevo)
router.post('/nuevo_museo',isAuth,museo_controller.museo_post)
router.post('/borrar/:id_museo',isAuth,museo_controller.soft_erase)
router.post('/regresar/:id_museo',isAuth,museo_controller.soft_unerase)
router.get('/registro',isAuth,museo_controller.register)
router.get('/:id_museo',isAuth,museo_controller.get_Onemuseo)
router.post('/:id_museo',isAuth,museo_controller.museo_update)

// Sala controller calls
const sala_controller = require('../controllers/sala_controller');
router.get('/:id_museo/sala',isAuth,sala_controller.lista);
router.post('/:id_museo/nueva_sala',isAuth,sala_controller.sala_post);
router.get('/:id_museo/nueva_sala',isAuth,sala_controller.sala_get);
router.get('/:id_museo/:id_sala',isAuth,sala_controller.update_get);
router.post('/:id_museo/:id_sala',isAuth,sala_controller.update);
router.post('/:id_museo/:id_sala/borrar',isAuth,sala_controller.soft_erase);

// Obra controller calls
const obra_controller = require('../controllers/obra_controller');
router.get('/:id_museo/:id_sala/obras',isAuth,obra_controller.lista);
router.post('/:id_museo/:id_sala/nueva_obra',isAuth,obra_controller.obra_post);
router.get('/:id_museo/:id_sala/nueva_obra',isAuth,obra_controller.obra_get);
router.post('/:id_museo/:id_sala/:id_obra',isAuth,obra_controller.update);
router.get('/:id_museo/:id_sala/:id_obra',isAuth,obra_controller.update_get);
router.post('/:id_museo/:id_sala/:id_obra/borrar',isAuth,obra_controller.delete);

// API REST
router.get('/get',museo_controller.get_museo_api);
router.get('/getAll',museo_controller.get_all_api);

module.exports = router;