const path = require("path");
const filesystem = require('fs');

exports.lista=(request,response,next)=>{
  Obra.fetchList()
    .then(([rowsObra, fieldData]) => {
      response.render('sala_obras',{
        obras: rowsObra
      }
    );
    }).catch(err => console.log(err));
}

exports.obra_get=(request,response,next)=>{
  response.render('nueva_obra');
};

exports.obra_post = (request, response, next) => {
    
    // url_imagen = request.file;
    // if((typeof(url_imagen) == "undefined")){
    //     url_imagen = "";
    // }else{
    //     url_imagen = request.file.filename;
    // }
    // img_sala = request.file;

    // const nueva_sala = new Sala(
    //   request.body.nom_sala,
    //   request.body.desc_sala,
    //   request.body.audio_sala,
    //   request.body.img_sala,
    //   request.body.id_museo
    // )
    // console.log(nueva_sala)
    // nueva_sala.save()
    // .then((result) => {
    //   response.redirect ("/sala");
    // }).catch(err => console.log(err));  
  };

  exports.api_get_obra=(request,response,next)=>{
    Obra.fetchList()
      .then(([rowsObras,fieldData])=>{
        response.status(200).json({
          obras: rowsObras
      });
      }).catch(err => console.log(err));
  }