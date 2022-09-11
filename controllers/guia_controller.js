const path = require("path");
const filesystem = require('fs');
const Guia = require("../models/guia");
//const { response } = require("express");

exports.view = (request, response, next) => {
  console.log("Consultando Guias...");
  response.render('guias');
};

exports.get_editarGuia = (request, response, next) => {
  console.log("Consultando Editar Guia...");
  response.render('editar_guia');
};

exports.post_editarGuia = (request, response, next) => {
  console.log("Guia Editada...");
  response.render('guias');
};

exports.get_agregarGuia = (request, response, next) => {
  console.log("Consultando Agregar Guia...")
  response.render('agregar_guia');
}