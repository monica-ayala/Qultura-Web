const path = require("path");
const filesystem = require('fs');
const Obra = require("../models/obra");
const Sala = require("../models/sala"); 
const Museo = require("../models/museo"); 
const request = require("express/lib/request");

exports.lista=(request,response,next)=>{
  Obra.fetchList(request.params.id_sala)
    .then(([rowsObra, fieldData]) => {
      Museo.fetchOne(request.params.id_museo)
      .then(([rowsMuseo, fieldData]) => {
        Sala.fetchOne(request.params.id_sala)
        .then(([rowsSala, fieldData]) => {
          response.render('sala_obras',{
            museo: rowsMuseo,
            sala: rowsSala,
            obras: rowsObra
          }
        );
        }).catch(err => console.log(err));
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
}

exports.obra_get=(request,response,next)=>{
  response.render('nueva_obra');
};

exports.obra_post = (request, response, next) => {
    
  url_imagen = request.file;
  if((typeof(url_imagen) == "undefined")){
      url_imagen = "";
  }else{
      url_imagen = request.file.filename;
  }
  audio_obra = ""
  ruta = "/museo/"+request.params.id_museo+"/"+request.params.id_sala+"/obras"
    const nueva_obra = new Obra(
      request.body.nom_obra,
      audio_obra,
      request.body.subtitulo_obra,
      url_imagen,
      request.body.fecha_obra,
      request.body.autor_obra,
      request.body.desc_obra,
      request.params.id_sala
    )
    nueva_obra.save()
    .then((result) => {
      response.redirect (ruta);
    }).catch(err => console.log(err));  
  };

  exports.update_get=(request,response,next)=>{
    Obra.fetchOne(request.params.id_obra)
    .then(([rowsObra,fieldData])=>{
      response.render('obra_modificar',{
        obras: rowsObra
      });
    })
    .catch(err=>console.log(err));
  }

  exports.update=(request,response,next)=>{
      url_imagen = request.file;
    if((typeof(url_imagen) == "undefined")){
        url_imagen = request.body.url_obra;
    }else{
        url_imagen = request.file.filename;
    }
    audio_obra = ""

    ruta = "/museo/"+request.params.id_museo+"/"+request.params.id_sala+"/obras"
    Obra.update(request.body.nom_obra,audio_obra,request.body.subtitulo_obra,url_imagen,request.body.fecha_obra,request.body.autor_obra,request.body.desc_obra,request.params.id_obra)
    .then(() => {
      response.redirect(ruta);
    })
    .catch(err => console.log(err));
  }

  exports.api_get_obra=(request,response,next)=>{
    Obra.fetchList()
      .then(([rowsObras,fieldData])=>{
        response.status(200).json({
          obras: rowsObras
      });
      }).catch(err => console.log(err));
  }