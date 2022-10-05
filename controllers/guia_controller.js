const path = require("path");
const filesystem = require("fs");
const Guia = require("../models/guia");

exports.get_guias = (request, response, next) => {
  Guia.fetchAll()
    .then((rows, fieldData) => {
      response.status(200).json({
        guias: rows[0],
      });
    })
    .catch((err) => console.log(err));
};

exports.view = (request, response, next) => {
  console.log("Consultando Guias...");
  Guia.fetchAll()
    .then((rows, fieldData) => {
      console.log(rows[0]);
      response.render("guias", {
        guias: rows[0],
      });
    })
    .catch((err) => console.log(err));
};

exports.get_editarGuia = (request, response, next) => {
  console.log("Consultando Editar Guia...");
  const idGuia = request.params.id_guia;
  console.log("ID de la Guia a editar es: " + idGuia);
  console.log(idGuia);
  Guia.fetchGuiaEditar(idGuia)
    .then((rows, fieldData) => {
      console.log(rows);
      console.log("La Guia a Editar sera: " + rows[0][0].nombre_guia);
      response.render("editar_guia", {
        nombre: rows[0][0].nombre_guia,
        id_guia: rows[0][0].id_guia,
        descripcion: rows[0][0].desc_guia,
        tip: rows[0][0].tip_guia,
        imagen: rows[0][0].imagen_guia,
        icono: rows[0][0].icono_guia,
        video: rows[0][0].video_guia,
      });
    })
    .catch((err) => console.log(err));
};

exports.post_editarGuia = (request, response, next) => {
  console.log("Guia Editada...");
  const id_guia = request.body.id_guia;
  const nombre = request.body.nombre;
  const descripcion = request.body.descripcion;
  const tip = request.body.tip;
  const imagen = request.body.icono;
  const video = request.body.video;
  const icono = request.body.icono;
  Guia.editar(video, descripcion, icono, nombre, tip, id_guia)
    .then((atributos, fieldData) => {
      console.log(atributos);
      Guia.fetchAll()
        .then((rows, fieldData) => {
          console.log(rows[0]);
          response.render("guias", {
            guias: rows[0],
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.get_agregarGuia = (request, response, next) => {
  console.log("Consultando Agregar Guia...");
  response.render("agregar_guia");
};

exports.post_agregarGuia = (request, response, next) => {
  console.log("Guia Agregada...");
  const guia = new Guia(
    request.body.video,
    request.body.descripcion,
    request.body.icono,
    request.body.nombre,
    request.body.tip,
    request.body.imagen
  );
  console.log(guia);
  guia
    .save()
    .then(() => {
      response.redirect("/guias");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.eliminarGuia = (request, response, next) => {
  const idGuia = request.params.id_guia;
  console.log("ID de la Guia a Eliminar es: " + idGuia);
  console.log(idGuia);
  Guia.eliminarGuia(idGuia)
    .then(() => {
      console.log("Guia Eliminada");
      response.redirect("/guias");
    })
    .catch((error) => {
      console.log(error);
    });
};
