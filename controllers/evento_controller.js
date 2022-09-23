const path = require("path");
const filesystem = require('fs');
const Evento = require("../models/evento"); 
//const { response } = require("express");


exports.get_nuevo=(request,response,next)=>{
    response.render('nuevo_evento');
};

exports.post_nuevo = (request, response, next) => {
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
      request.body.fecha_hora,
      url_imagen,
      request.body.ubicacion_evento
    )
    nuevo_evento.save()
    .then((result) => {
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