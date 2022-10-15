const express = require('express');
const router = express.Router();
const isAuth= require ('../util/is-auth.js')
const usuario_controller = require('../controllers/usuario_controller');
const api= require ('../util/is-valid-api.js')

// User controller calls
router.get('/signup',usuario_controller.signup_get);
router.post('/signup',usuario_controller.signup_post);
router.get('/login',usuario_controller.login_get);
router.post('/login',usuario_controller.login_post);
router.get('/logout',usuario_controller.logout);
router.get('/rol',isAuth,usuario_controller.view);
router.get('/rol/:id_usuario',isAuth,usuario_controller.updateUsuario);
router.get('/loggedin',isAuth,usuario_controller.getUser);
router.post('/rol/:id_usuario',isAuth,usuario_controller.sendUpdate);
router.post('/borrar/usuario/:id_user',isAuth,usuario_controller.erase);

// REST API
router.get('/login_movil',api,usuario_controller.login_movil_get);
router.post('/login_movil',usuario_controller.login_movil_post);
router.post('/signup_movil',usuario_controller.signup_post_movil);

module.exports = router;