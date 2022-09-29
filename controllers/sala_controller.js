const path = require("path");
const filesystem = require('fs');
const Sala = require("../models/sala"); 
const Museo = require("../models/museo"); 
const request = require("express/lib/request");


exports.lista=(request,response,next)=>{
  Sala.fetchListMuseum(request.params.id_museo)
    .then(([rowsSala, fieldData]) => {
      Museo.fecthOne(request.params.id_museo)
        .then(([rowsMuseo, fieldData]) => {
        
          response.render('museo_salas',{
            museo: rowsMuseo,
            salas:rowsSala
          }
        );
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
}

exports.sala_get=(request,response,next)=>{
  response.render('nueva_sala');
};

exports.sala_post = (request, response, next) => {
    
    url_imagen = request.file;
    if((typeof(url_imagen) == "undefined")){
        url_imagen = "";
    }else{
        url_imagen = request.file.filename;
    }
    audio_sala = "placeholder"
    id_museo = 1
    
    const nueva_sala = new Sala(
      request.body.nom_sala,
      request.body.desc_sala,
      audio_sala,
      url_imagen,
      id_museo
    )
    console.log(nueva_sala)
    nueva_sala.save()
    ruta = "/museo/"+request.params.id_museo+"/sala"
    .then((result) => {
      response.redirect (ruta);
    }).catch(err => console.log(err));  
  };

  exports.update_get=(request,response,next)=>{
    Sala.fetchOne(request.params.id_sala)
    .then(([rowsSala,fieldData])=>{
      Museo.fetchOne(request.params.id_museo)
      .then(([rowsMuseo,fieldData])=>{
        response.render('sala_modificar',{
          museo: rowsMuseo,
          salas:rowsSala
        });
      })
      .catch(err=>console.log(err));
    })
    .catch(err=>console.log(err));
  }

  exports.update=(request,response,next)=>{
      url_imagen = request.file;
    if((typeof(url_imagen) == "undefined")){
        url_imagen = request.body.url_sala;
    }else{
        url_imagen = request.file.filename;
    }
    audio_sala = ""
    ruta = "/museo/"+request.params.id_museo+"/sala"
    Sala.update(request.body.nom_sala,request.body.desc_sala,audio_sala,url_imagen,request.params.id_sala)
    .then(() => {
      response.redirect(ruta);
    })
    .catch(err => console.log(err));
  }

  exports.soft_erase = (request, response, next) => {
    Sala.softErase(request.params.id_sala,0)
    Sala.fetchList()
    .then(([rowsSala,fieldData])=>{
      response.status(200).json({salas:rowsSala});
    }).catch(err => console.log(err));
  
  }

  exports.api_get_sala=(request,response,next)=>{
    Sala.fetchList()
      .then(([rowsSalas,fieldData])=>{
        response.status(200).json({
          salas: rowsSalas
      });
      }).catch(err => console.log(err));
  }