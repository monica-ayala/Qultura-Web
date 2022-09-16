const path = require("path");
const filesystem = require('fs');
const Museo = require("../models/museo");
//const { response } = require("express");

exports.view = (request, response, next) => {
    response.render('principal');
  };

exports.get_nuevo=(request,response,next)=>{
    response.render('nuevo_museo');
};

exports.post_nuevo=(request,response,next)=>{
  const nuevo_museo = new Museo(
    request.body.nom_museo,
    request.body.desc_museo,
    request.body.ubicacion_museo,
    request.body.num_museo,
    request.body.imagen_principal,
    request.body.imagen_background
  )
  nuevo_museo.save()
  .then((result) => {
    response.status(200).json({});
  }).catch(err => console.log(err));
}


exports.lista=(request,response,next)=>{
  Museo.fetchList()
    .then(([rowsMuseos, fieldData]) => {
      response.render('principal',{
        museos:rowsMuseos
      }
    );
    }).catch(err => console.log(err));
}

exports.get_museo=(request,response,next)=>{
  Museo.fetchList()
    .then(([rowsMuseos,fieldData])=>{
      response.status(200).json({
        museos:rowsMuseos
    });
    }).catch(err => console.log(err));
}

exports.register = (request, response, next) => {
  response.render('museo_registrar');
};

exports.museo_post = (request, response, next) => {
    
  url_imagen = request.file;
  if((typeof(url_imagen) == "undefined")){
      url_imagen = "";
  }else{
      url_imagen = request.file.filename;
  }
  link_ubi="placeholder"
  const nuevo_museo = new Museo(
    request.body.nom_museo,
    request.body.desc_museo,
    request.body.ubicacion_museo,
    link_ubi,
    request.body.num_museo,
    url_imagen,
    url_imagen
  )
  console.log(nuevo_museo)
  nuevo_museo.save()
  .then((result) => {
    response.redirect ("/museo");
  }).catch(err => console.log(err));  
};

exports.get_Onemuseo = (request, response, next) => {
  console.log(request.params.id_usuario);

  Museo.fecthOne(request.params.id_museo)
  .then(([rowsMuseos,fieldData])=>{
    response.render('principal',{
      museos:rowsMuseos
    });
  })
  .catch(err=>console.log(err));
 };

exports.museo_update = (request,response,next)=>{

  Museo.update_museo(request.body.id_museo)
  .then(() => {
    response.status(200).json({});
  })
  .catch(err => console.log(err));
};


// exports.post_procedencia=(request,response,next)=>{
//     console.log(request.body.Nombre_Procedencia)
//     const procedencianueva= new Procedencia(request.body.Nombre_Procedencia);
//     procedencianueva.save()
//         .then((result)=>{
//             let idNuevo = result[0].insertId;
//             response.status(200).json({id_nueva_procedencia: idNuevo});
//         })
//         .catch((err)=>{
//             console.log(err);
//         })

// }