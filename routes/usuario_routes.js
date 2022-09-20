 const express = require('express');
const router = express.Router();
// const isAuth= require ('../util/is-auth.js')

const usuario_controller = require('../controllers/usuario_controller');

// EJEMPLOS
router.get('/signup',usuario_controller.signup_get);

router.post('/signup',usuario_controller.signup_post);

router.get('/login',usuario_controller.login_get);

router.post('/login',usuario_controller.login_post);

router.get('/login_movil',usuario_controller.login_movil_get);
router.post('/login_movil',usuario_controller.login_movil_post);

router.get('/rol',usuario_controller.view);

router.get('/rol/:id_usuario',usuario_controller.updateUsuario);

router.post('/rol/:id_usuario',usuario_controller.sendUpdate);

// router.get('/datos', isAuth,usuario_controller.datos);

// router.get('/datos/:id_usuario', isAuth, usuario_controller.getDatosUsuario);

// router.post('/:id_usuario', isAuth,usuario_controller.usuario_post);

// router.get('/logout',usuario_controller.logout);


module.exports = router;