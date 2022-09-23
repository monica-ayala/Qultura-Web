const path = require("path");
const filesystem = require('fs');
const Solicitud = require("../models/solicitud");
const Necesidad = require("../models/necesidad");
const request = require("express/lib/request");

exports.get_solicitudes=(request,response,next)=>{
  Solicitud.fetchAll()
    .then(([rowsSolicitud,fieldData])=>{
        Necesidad.fetchAll()
        .then(([rowsNecesidad,fieldData])=>{
            response.status(200).json({
                solicitudes:rowsSolicitud,
                necesidades:rowsNecesidad
            });
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
};

exports.elimina_solicitud=(request,response,next)=>{
    console.log(request.body)
    Solicitud.deleteOne(request.body.id_solicitud)
      .then(([rowsSolicitud,fieldData])=>{
        response.status(200).json({});
      }).catch(err => console.log(err));
  };