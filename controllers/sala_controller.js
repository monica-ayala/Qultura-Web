const path = require("path");
const filesystem = require('fs');
const Sala = require("../models/sala"); 

exports.lista=(request,response,next)=>{
  Sala.fetchList()
    .then(([rowsSala, fieldData]) => {
      response.render('museo_salas',{
        salas:rowsSala
      }
    );
    }).catch(err => console.log(err));
}

exports.sala_post = (request, response, next) => {
    
    // url_imagen = request.file;
    // if((typeof(url_imagen) == "undefined")){
    //     url_imagen = "";
    // }else{
    //     url_imagen = request.file.filename;
    // }
    // img_sala = request.file;
    const nueva_sala = new Sala(
      request.body.nom_sala,
      request.body.desc_sala,
      request.body.audio_sala,
      request.body.img_sala,
      request.body.id_museo
    )
    console.log(nueva_sala)
    nueva_sala.save()
    .then((result) => {
      response.redirect ("/sala");
    }).catch(err => console.log(err));  
  };