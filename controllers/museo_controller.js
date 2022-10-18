const path = require("path");
const filesystem = require("fs");
const Museo = require("../models/museo");
const Sala = require("../models/sala");
const Obra = require("../models/obra");
const Evento = require("../models/evento");
const jwt = require("jsonwebtoken")


// get api
exports.token = (request,response,next)=>{
  const accessToken = jwt.sign({ token: "kotlin api" }, process.env.TOKEN_SECRET);
  return request.session.save((err) => {
  response.status(200).json({
    accessToken
  });
  });
};

exports.view = (request, response, next) => {
  response.render("principal");
};

exports.get_nuevo = (request, response, next) => {
  if(request.session.id_rol == 4){
    response.render("nuevo_museo");
  }else{
    response.redner("/");
  }
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
                session: request.session.id_museo,
                rol : request.session.id_rol
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.get_museo_api = (request, response, next) => {
  Museo.fetchListApi()
    .then(([rowsMuseos, fieldData]) => {
      response.status(200).json({
        museos: rowsMuseos,
      });
    })
    .catch((err) => console.log(err));
};

exports.get_all_api = (request, response, next) => {
  Museo.fetchListApi()
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
  if(request.session.id_rol == 4){
    if(request.session.id_museo == request.params.id_museo || request.session.id_museo == 1){
      link_ubi = "placeholder";
      const nuevo_museo = new Museo(
        request.body.nom_museo,
        request.body.desc_museo,
        request.body.ubicacion_museo,
        link_ubi,
        request.body.num_museo,
        request.body.imgP_museo,
        request.body.imgB_museo
      );
      nuevo_museo
        .save()
        .then((result) => {
          for(let horario of request.body.horarios){
            console.log(horario)
            Museo.AsignarHorario(result[0].insertId,horario.dia,horario.fin,horario.inicio);
          };
          response.status(200).json({})
        }).catch(err => console.log(err)); 
    }else{
      response.redirect('/')
    }
  }else{
    response.redirect("/")
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
  if(request.session.id_rol == 4 || request.session.id_rol == 3){
    Museo.softErase(request.params.id_museo, 1);
  Museo.fetchList()
    .then(([rowsMuseos, fieldData]) => {
      response.status(200).json({ museos: rowsMuseos });
    })
    .catch((err) => console.log(err));
  }else{
    response.redirect("/");
  }
  
};

exports.get_Onemuseo = (request, response, next) => {
  if(request.params.id_museo == request.session.id_museo || request.session.id_museo == 1){
    
    Sala.fetchListMuseum(80)
    .then(([rowsSalas, fieldData]) => {
      Museo.fecthOne(request.params.id_museo)
      .then(([rowsMuseo, fieldData]) => {
        response.render("museo_registrar", {
          museos: rowsMuseo,
          salas: rowsSalas
        });
      })
      .catch((err) => console.log(err));
    }).catch(err => console.log(err));
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
  if(request.session.id_rol == 4 || request.session.id_rol == 3){
    if (request.session.id_museo == request.body.id_museo || request.session.id_museo == 1){
      console.log(request.body)
      Museo.update_museo(
        request.body.nom_museo,
        request.body.desc_museo,
        request.body.ubicacion_museo,
        request.body.num_museo,
        request.body.imgP_museo,
        request.params.id_museo
      )
        .then(() => {
          response.redirect("/");
        })
        .catch((err) => console.log(err));
    
      }else{
        response.redirect('/')
      }
  }else{
    response.redirect('/')
  }
  
};
