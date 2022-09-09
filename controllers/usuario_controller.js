const path = require("path");
const Usuario = require("../models/usuario");
const filesystem = require('fs');
//const bcrypt = require("bcryptjs");
//const { response } = require("express");
//const { redirect } = require("express/lib/response");
// const { getUnpackedSettings } = require("http2");
// const { Usuario_Verificar } = require("../models/usuario");

// EJEMPLOS: 
exports.view = (request, response, next) => {
  Usuario.fetchList()
  .then(([rowsUsers,fieldData])=>{
    response.render('rbac_registrar',{
      usuarios:rowsUsers
    }
    );
  }).catch(err=>console.log(err));
  };


 exports.signup_get = (request, response, next) => {
  response.render('login');
 };


 exports.signup_post = (request, response, next) => {
 };

 exports.login_get = (request, response, next) => {
  response.render('login');
 };

 exports.login_post = (request, response, next) => {
 };

// exports.logout = (request, response, next) => {
// };

// exports.getDatosUsuario = (request, response, next) => {
// };

// exports.usuario_post = (request, response, next) => {
// };

// exports.verificar_get = (request, response, next) => {
// };

// exports.verificar = (request, response, next) => {
// };