const path = require("path");
const filesystem = require('fs');
const Solicitud = require("../models/solicitud");
const Necesidad = require("../models/necesidad");

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