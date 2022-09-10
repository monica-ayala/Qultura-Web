const path = require("path");
const Usuario = require("../models/usuario");
const Museos = require("../models/museo");
const filesystem = require('fs');
//const bcrypt = require("bcryptjs");
const { response } = require("express");
const { redirect } = require("express/lib/response");
//const { getUnpackedSettings } = require("http2");
// const { Usuario_Verificar } = require("../models/usuario");

 
exports.view = (request, response, next) => {
  Usuario.fetchList()
  .then(([rowsUsers,fieldData])=>{
    response.render('rbac_registrar',{
      usuarios:rowsUsers});
    }).catch(err=>console.log(err));
  };
   


 exports.signup_get = (request, response, next) => {
  response.render('signup');
 };


 exports.signup_post = (request, response, next) => {
  const nuevo_usuario = new Usuario(
    request.body.us_nombre,
    request.body.us_correo,
    request.body.us_password
  );

  Usuario.findOne(request.body.us_correo)
  .then(([rows,fieldData])=>{
    if (rows.length==0){
      nuevo_usuario.save()
      .then(()=>{
        response.redirect("/usuario/login");
      })
      .catch(err=>console.log(err));
    }else{
      response.redirect("/usuario/signup");
    }
  })
  .catch((err) => {
    console.log(err);
  });
};

 exports.login_get = (request, response, next) => {
  response.render('login');
 };

 exports.login_post = (request, response, next) => {
  Usuario.findOne(request.body.us_correo)
  .then(([rows,fieldData])=>{
    if(rows.length == 1){
      response.redirect("/")
    }
  }).catch((err)=>{
    console.log(err);
  })

 };

// exports.logout = (request, response, next) => {
// };

 exports.updateUsuario = (request, response, next) => {

  Usuario.roles()
  .then(([rowsRoles,fieldData])=>{
    Museos.fetchList()
    .then(([rowsMuseos,fieldData])=>{
      response.status(200).json({
        roles:rowsRoles,
        museos:rowsMuseos
      });
    }).catch(err=>console.log(err));
  }).catch(err=>console.log(err));
  
 };

// exports.usuario_post = (request, response, next) => {
// };

// exports.verificar_get = (request, response, next) => {
// };

// exports.verificar = (request, response, next) => {
// };