const path = require("path");
const filesystem = require('fs');
const Link = require("../models/links");
const { links } = require("express/lib/response");
//const { response } = require("express");

exports.view = (request, response, next) => {
    console.log("Consultando Links...");
    Link.fetchAll().then((rows, fieldData) => {
      console.log(rows[0]);
      response.render('links',{
        links: rows[0]
      });
      }).catch(err => console.log(err));
  };

exports.get_links = (request, response, next) => {
    Link.fetchAll()
      .then((rows, fieldData) => {
        response.status(200).json({
          links: rows[0]
        });
    }).catch(err => console.log(err));
};

exports.get_agregarLink = (request, response, next) => {
    console.log("Consultando Agregar Link...")
    response.render('agregar_link');
};

exports.post_agregarLink = (request, response, next) => {
    console.log("Link Agregado...")
    const link = new Link(request.body.nombre, request.body.url);
    console.log(link);
    link.save()
      .then(() => {
        response.redirect("/links");
      })
    .catch((error) => {
        console.log(error);
    });
}

exports.eliminarLink = (request, response, next) => {
  const idLink = request.params.id_link;
  console.log("ID del Link a Eliminar es: " + idLink);
  console.log(idLink);
  Link.eliminarLink(idLink).then(() => {
    console.log("Link Eliminada")
    response.redirect("/links");
    })
    .catch((error) => {
      console.log(error);
  });
};