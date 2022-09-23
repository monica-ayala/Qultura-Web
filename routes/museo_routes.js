const express = require('express');
const router = express.Router();
const filesystem = require('fs');
const path = require('path');
// const isAuth= require ('../util/is-auth.js')
const museo_controller = require('../controllers/museo_controller');
router.get('/',museo_controller.lista);
router.get('/get',museo_controller.get_museo_api);
router.get('/getAll',museo_controller.get_all_api);
router.get('/nuevo_museo',museo_controller.get_nuevo)
router.post('/nuevo_museo',museo_controller.museo_post)
router.post('/borrar/:id_museo',museo_controller.soft_erase)
router.post('/regresar/:id_museo',museo_controller.soft_unerase)
router.get('/registro',museo_controller.register)
router.get('/:id_museo',museo_controller.get_Onemuseo)
router.post('/:id_museo',museo_controller.museo_update)

const sala_controller = require('../controllers/sala_controller');
router.get('/:id_museo/sala',sala_controller.lista);
router.post('/:id_museo/nueva_sala',sala_controller.sala_post);
router.get('/:id_museo/nueva_sala',sala_controller.sala_get);
router.get('/:id_museo/:id_sala',sala_controller.update_get);
router.post('/:id_museo/:id_sala',sala_controller.update);
router.post('/:id_museo/:id_sala/borrar',sala_controller.soft_erase);

const obra_controller = require('../controllers/obra_controller');
router.get('/:id_museo/:id_sala/obras',obra_controller.lista);
router.post('/:id_museo/:id_sala/nueva_obra',obra_controller.obra_post);
router.get('/:id_museo/:id_sala/nueva_obra',obra_controller.obra_get);
router.post('/:id_museo/:id_sala/:id_obra',obra_controller.update);
router.get('/:id_museo/:id_sala/:id_obra',obra_controller.update_get);
router.post('/:id_museo/:id_sala/:id_obra/borrar',obra_controller.delete);


module.exports = router;