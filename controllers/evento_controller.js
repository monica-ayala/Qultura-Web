const path = require("path");
const filesystem = require('fs');
const Evento = require("../models/evento"); 
//const { response } = require("express");


exports.get_nuevo=(request,response,next)=>{
  Evento.fetchTags()
  .then(([rowsTags])=>{
    response.render('nuevo_evento',{
      tags:rowsTags
    });
  })
};

exports.post_nuevo = (request, response, next) => {
  let fecha_hora = request.body.fecha_start + " "+ request.body.fecha_end +" ";
  fecha_hora += request.body.hora_inicio + " "+ request.body.hora_fin;
    url_imagen = request.file;
    if((typeof(url_imagen) == "undefined")){
        url_imagen = "";
    }else{
        url_imagen = request.file.filename;
    }
    url_imagenB = request.file;
    link_ubi="placeholder";
    const nuevo_evento = new Evento(
      request.body.info_evento,
      fecha_hora,
      url_imagen,
      request.body.ubicacion_evento
    )
    nuevo_evento.save()
    .then((result) => {
      for(let tag of request.body.sevento){
        Evento.AsignTags(tag,result[0].insertId);
      };
      response.redirect ("/museo");
    }).catch(err => console.log(err));  
  };
  
exports.erase=(request,response,next)=>{
    Evento.softErase(request.params.id_evento)
    Evento.fetchList()
    .then(([rowsEventos,fieldData])=>{
      response.status(200).json({eventos:rowsEventos});
    }).catch(err => console.log(err));
}

exports.getAll=(request,response,next)=>{
      Evento.fetchList()
      .then(([rowsEventos,fieldData])=>{
        Evento.fetchEventTags()
        .then(([rowsTags,fieldData])=>{
          response.status(200).json({
            eventos: rowsEventos,
            tags:rowsTags
          })
        }).catch(err => console.log(err));
      }).catch(err => console.log(err));
}