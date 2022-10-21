const express = require('express');
const router = express.Router();
const isAuth= require ('../util/is-auth.js')
const usuario_controller = require('../controllers/usuario_controller');
const api= require ('../util/is-valid-api.js')

// User controller calls

//Ruta para cargar la pagina de Sign up
router.get('/signup',usuario_controller.signup_get);

//Ruta al crear usuarios dentro de la view Usuarios
router.post('/crear',isAuth,usuario_controller.create);

//Ruta post de registro de nuevos usuarios
router.post('/signup',usuario_controller.signup_post);

//Ruta para renderizar el login
router.get('/login',usuario_controller.login_get);

//Ruta para ejecutar el login y proceder a la aplicacion
router.post('/login',usuario_controller.login_post);

//Ruta para cerrar sesion
router.get('/logout',usuario_controller.logout);

//Ruta de pagina de Usuarios y Roles
router.get('/rol',isAuth,usuario_controller.view);

//Ruta para visualizar un usuario en especifico
router.get('/rol/:id_usuario',isAuth,usuario_controller.updateUsuario);

//Ruta para verficar que el usuario tenga una sesion
router.get('/loggedin',isAuth,usuario_controller.getUser);

//Ruta para realizar los cambios de usuarios
router.post('/rol/:id_usuario',isAuth,usuario_controller.sendUpdate);

//Ruta para borrar usuarios
router.post('/borrar/usuario/:id_user',isAuth,usuario_controller.erase);

// REST API (Movil)

//Ruta para el inicio de sesion movil
router.get('/login_movil',usuario_controller.login_movil_get);
router.post('/login_movil',api,usuario_controller.login_movil_post);

//Ruta para el registro de nuevos usuarios
router.post('/signup_movil',api,usuario_controller.signup_post_movil);

module.exports = router;