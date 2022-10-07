const path = require("path");
const filesystem = require("fs");
const Museo = require("../models/museo");
const Sala = require("../models/sala");
const Obra = require("../models/obra");
const Evento = require("../models/evento");

exports.view = (request, response, next) => {
  response.render("principal");
};

exports.get_nuevo = (request, response, next) => {
  response.render("nuevo_museo");
};

exports.lista = (request, response, next) => {
  Museo.fetchList()
    .then(([rowsMuseos, fieldData]) => {
      Evento.fetchList()
        .then(([rowsEventos, fieldData]) => {
          Evento.fetchEventTags()
            .then(([rowsTags, fieldData]) => {
              response.render("principal", {
                museos: rowsMuseos,
                eventos: rowsEventos,
                tags: rowsTags,
                session: request.session.id_museo
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.get_museo_api = (request, response, next) => {
  Museo.fetchList()
    .then(([rowsMuseos, fieldData]) => {
      response.status(200).json({
        museos: rowsMuseos,
      });
    })
    .catch((err) => console.log(err));
};

exports.get_all_api = (request, response, next) => {
  Museo.fetchList()
    .then(([rowsMuseos, fieldData]) => {
      Sala.fetchList()
        .then(([rowsSalas, fieldData]) => {
          Obra.fetchAll()
            .then(([rowsObras, fieldData]) => {
              response.status(200).json({
                museos: rowsMuseos,
                salas: rowsSalas,
                obras: rowsObras,
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.register = (request, response, next) => {
  response.render("museo_registrar");
};

exports.museo_post = (request, response, next) => {
  if(request.session.id_museo == request.params.id_museo || request.session.id_museo == 1){
    url_imagen = request.file;
    if (typeof url_imagen == "undefined") {
      url_imagen = "";
    } else {
      url_imagen = request.file.filename;
    }
    link_ubi = "placeholder";
    const nuevo_museo = new Museo(
      request.body.nom_museo,
      request.body.desc_museo,
      request.body.ubicacion_museo,
      link_ubi,
      request.body.num_museo,
      url_imagen,
      url_imagen
    );
    nuevo_museo
      .save()
      .then((result) => {
        response.redirect("/museo");
      })
      .catch((err) => console.log(err));
  }else{
    response.redirect('/')
  }
  
};

exports.soft_erase = (request, response, next) => {
  if (request.session.id_museo == request.params.id_museo || request.session.id_museo == 1){
    Museo.softErase(request.params.id_museo, 0);
  Museo.fetchList()
    .then(([rowsMuseos, fieldData]) => {
      response.status(200).json({ museos: rowsMuseos });
    })
    .catch((err) => console.log(err));
  }else{
    response.redirect('/')
  }
  
};

exports.soft_unerase = (request, response, next) => {
  Museo.softErase(request.params.id_museo, 1);
  Museo.fetchList()
    .then(([rowsMuseos, fieldData]) => {
      response.status(200).json({ museos: rowsMuseos });
    })
    .catch((err) => console.log(err));
};

exports.get_Onemuseo = (request, response, next) => {
  if(request.params.id_museo == request.session.id_museo || request.session.id_museo == 1){
    Museo.fecthOne(request.params.id_museo)
    .then(([rowsMuseos, fieldData]) => {
      response.render("museo_registrar", {
        museos: rowsMuseos,
      });
    })
    .catch((err) => console.log(err));
  }else{
    response.redirect('/')
  }
  
};

    
exports.api_get_one = (request, response, next) => {
  Museo.fecthOne(request.params.id_museo)
  .then(([rowsMuseos,fieldData])=>{
    response.status(200).json({
      museos:rowsMuseos
    });
  })
  .catch(err=>console.log(err));
 };

exports.museo_update = (request,response,next)=>{
  if (request.session.id_museo == request.body.id_museo || request.session.id_museo == 1){
  url_imagen = request.file;
  if (typeof url_imagen == "undefined") {
    url_imagen = request.body.museo_url;
  } else {
    url_imagen = request.file.filename;
  }
  Museo.update_museo(
    request.body.nom_museo,
    request.body.desc_museo,
    request.body.direccion_museo,
    request.body.num_museo,
    url_imagen,
    request.body.id_museo
  )
    .then(() => {
      response.redirect("/");
    })
    .catch((err) => console.log(err));

  }else{
    response.redirect('/')
  }
};
