const express = require('express');
const router = express.Router();
// const isAuth= require ('../util/is-auth.js')

const museo_controller = require('../controllers/museo_controller');
// EJEMPLOS

router.get('/',museo_controller.lista);
router.get('/nuevo_museo',museo_controller.get_nuevo)
router.post('/nuevo_museo',museo_controller.post_nuevo)
router.get('/registro',museo_controller.register)
// router.get('/signup',usuario_controller.signup_get);

// router.post('/signup',usuario_controller.signup_post);

// router.get('/login',usuario_controller.login_get);

// router.post('/login',usuario_controller.login_post);

// router.get('/lista', isAuth,usuario_controller.lista);

// router.get('/datos', isAuth,usuario_controller.datos);

// router.get('/datos/:id_usuario', isAuth, usuario_controller.getDatosUsuario);

// router.post('/:id_usuario', isAuth,usuario_controller.usuario_post);

// router.get('/logout',usuario_controller.logout);


module.exports = router;