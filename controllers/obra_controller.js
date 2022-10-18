const path = require("path");
const filesystem = require("fs");
const Obra = require("../models/obra");
const Sala = require("../models/sala");
const Museo = require("../models/museo");
const request = require("express/lib/request");

exports.lista = (request, response, next) => {
  if(request.session.id_museo == request.params.id_museo || request.session.id_museo == 1){
    Obra.fetchList(request.params.id_sala)
    .then(([rowsObra, fieldData]) => {
      Museo.fetchOne(request.params.id_museo)
        .then(([rowsMuseo, fieldData]) => {
          Sala.fetchOne(request.params.id_sala)
            .then(([rowsSala, fieldData]) => {
              response.render("sala_obras", {
                museo: rowsMuseo,
                sala: rowsSala,
                obras: rowsObra,
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
  }else{
    response.redirect('/')
  }
  
};

exports.obra_get = (request, response, next) => {
  if(request.session.id_museo == request.params.id_museo || request.session.id_museo == 1){
    response.render("nueva_obra",{
      museo: request.params.id_museo,
      sala: request.params.id_sala
    });
  }else{
    response.redirect('/')
  }
};

exports.obra_post = (request, response, next) => {
  if(request.session.id_museo == request.params.id_museo || request.session.id_museo == 1){
    
    ruta =
      "/museo/" +
      request.params.id_museo +
      "/" +
      request.params.id_sala +
      "/obras";
    const nueva_obra = new Obra(
      request.body.nom_obra,
      request.body.audio_obra,
      request.body.subtitulo_obra,
      request.body.img_museo,
      request.body.fecha_obra,
      request.body.autor_obra,
      request.body.desc_obra,
      request.params.id_sala
    );
    nueva_obra
      .save()
      .then((result) => {
        response.redirect(ruta);
      })
      .catch((err) => console.log(err));
  }else{
    response.redirect('/')
  }
  
};

exports.update_get = (request, response, next) => {
  if (request.session.id_museo == request.params.id_museo || request.session.id_museo == 1){
    Obra.fetchOne(request.params.id_obra)
    .then(([rowsObra, fieldData]) => {
      response.render("obra_modificar", {
        obras: rowsObra,
      });
    })
    .catch((err) => console.log(err));
  }else{
    response.redirect('/')
  }
  
};

exports.update = (request, response, next) => {
  if(request.session.id_museo ==request.params.id_museo || request.session.id_museo == 1){
    url_imagen = request.file;
  if (typeof url_imagen == "undefined") {
    url_imagen = request.body.url_obra;
  } else {
    url_imagen = request.file.filename;
  }
  audio_obra = "";

  ruta =
    "/museo/" +
    request.params.id_museo +
    "/" +
    request.params.id_sala +
    "/obras";
  Obra.update(
    request.body.nom_obra,
    audio_obra,
    request.body.subtitulo_obra,
    url_imagen,
    request.body.fecha_obra,
    request.body.autor_obra,
    request.body.desc_obra,
    request.params.id_obra
  )
    .then(() => {
      response.redirect(ruta);
    })
    .catch((err) => console.log(err));
  }else{
    response.redirect('/')
  }
  
};

exports.delete = (request, response, next) => {
  if (request.session.id_museo == request.params.id_museo || request.session.id_museo == 1){
    Obra.delete(request.params.id_obra);
  Obra.fetchList(request.params.id_sala)
    .then(([rowsObra, fieldData]) => {
      response.status(200).json({ obras: rowsObra });
    })
    .catch((err) => console.log(err));
  }else{
    response.redirect('/')
  }
  
};

exports.api_get_obra = (request, response, next) => {
  Obra.fetchAll()
    .then(([rowsObras, fieldData]) => {
      response.status(200).json({
        obras: rowsObras,
      });
    })
    .catch((err) => console.log(err));
};

exports.api_get_all_obras = (request, response, next) => {
  Obra.fetchList(request.params.id_sala)
    .then(([rowsObras, fieldData]) => {
      response.status(200).json({
        obras: rowsObras,
      });
    })
    .catch((err) => console.log(err));
};

exports.api_get_one = (request, response, next) => {
  Obra.fetchOne(request.params.id_obra)
    .then(([rowsObra, fieldData]) => {
      response.status(200).json({
        obra: rowsObra,
      });
    })
    .catch((err) => console.log(err));
};
