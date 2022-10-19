const path = require("path");
const filesystem = require('fs');
const Sala = require("../models/sala"); 
const Museo = require("../models/museo"); 
const request = require("express/lib/request");


exports.lista=(request,response,next)=>{
  if(request.session.id_museo == request.params.id_museo || request.session.id_museo == 1){
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
  }else{
    response.redirect('/')
  }
}

exports.sala_get=(request,response,next)=>{
  if (request.session.id_museo == request.params.id_museo || request.session.id_museo == 1){
    response.render('nueva_sala',{
      museo: request.params.id_museo
    });
  }else{
    response.redirect('/')
  }
};

exports.sala_post = (request, response, next) => {
    if (request.session.id_museo == request.params.id_museo || request.session.id_museo ==1){
      console.log("nueva")
      const nueva_sala = new Sala(
        request.body.nom_sala,
        request.body.desc_sala,
        request.body.audio_sala,
        request.body.img_sala,
        request.body.id_museo
      )
      console.log(nueva_sala)
      ruta = "/museo/"+request.params.id_museo+"/sala"
      nueva_sala.save()
      .then((result) => {
        response.status(200).json({})
      }).catch(err => console.log(err));  
    }else{
      response.redirect('/')
    }
    
  };

  exports.update_get=(request,response,next)=>{
    if (request.session.id_museo == request.params.id_museo || request.session.id_museo == 1){
      Sala.fetchOne(request.params.id_sala)
      .then(([rowsSala,fieldData])=>{
        Museo.fetchOne(request.params.id_museo)
        .then(([rowsMuseo,fieldData])=>{
          response.render('sala_modificar',{
            museos: rowsMuseo,
            salas:rowsSala,
            museo: request.params.id_museo
          });
        })
        .catch(err=>console.log(err));
      })
      .catch(err=>console.log(err));
    }else{
      response.redirect('/')
    }
    
  }

  exports.update=(request,response,next)=>{
    
    if(request.session.id_museo == request.params.id_museo || request.session.id_museo == 1){
      
    ruta = "/museo/"+request.params.id_museo+"/sala"
    console.log(request.body)
    Sala.update(
      request.body.nom_sala,
      request.body.desc_sala,
      request.body.audio_sala,
      request.body.img_sala,
      request.params.id_sala)
    .then(() => {
      response.redirect(ruta);
    })
    .catch(err => console.log(err));
    }else{
      response.redirect('/')
    }
  }

  exports.soft_erase = (request, response, next) => {
    if(request.session.id_museo == request.params.id_museo || request.session.id_museo == 1){
      Sala.softErase(request.params.id_sala,0)
      Sala.fetchList()
      .then(([rowsSala,fieldData])=>{
        response.status(200).json({salas:rowsSala});
      }).catch(err => console.log(err));  
    } else{
      response.redirect('/')
    }
    
  }

  exports.api_get_sala=(request,response,next)=>{
    Sala.fetchList()
      .then(([rowsSalas,fieldData])=>{
        response.status(200).json({
          salas: rowsSalas
      });
      }).catch(err => console.log(err));
  }

  exports.api_get_all_salas=(request,response,next)=>{
    Sala.fetchListMuseum(request.params.id_museo)
    .then(([rowsSala, fieldData]) => {
          response.status(200).json({
            salas:rowsSala
          }
        );

    }).catch(err => console.log(err));
  }

  
  exports.api_get_one=(request,response,next)=>{
    Sala.fetchOne(request.params.id_sala)
    .then(([rowsSala,fieldData])=>{
        response.status(200).json({
          sala:rowsSala
        });
    })
    .catch(err=>console.log(err));
  }