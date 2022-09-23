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

exports.elimina_solicitud=(request,response,next)=>{
    Solicitud.deleteOne(request.body.id_solicitud)
      .then(([rowsSolicitud,fieldData])=>{
        response.status(200).json({});
      }).catch(err => console.log(err));
  };

  exports.agrega_solicitud=(request,response,next)=>{
    console.log(request.body);
    var date = new Date();
	  var current_time = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
    const solicitud_nueva = new Solicitud(request.body.info_adicional, current_time, request.body.fecha_hora_sol, request.body.num_Visitantes, 1, request.body.usuario_necesidad);
    solicitud_nueva.solicitud_save()
      .then(() => {
        if(request.body.necesidades.length != 0){
          Solicitud.solicitud_fetch_lastinsertion()
            .then(([rowLastSolicitud, fieldDatalastSolicitud]) => {
              for(var i = 0; i < request.body.necesidades.length; i++){
                Solicitud.necesidades_save(rowLastSolicitud[0].id_solicitud, request.body.necesidades[i])
                .then()
                .catch(err => console.log(err));
              }
          }).catch(err => console.log(err));
        }
    }).catch(err => console.log(err));
  }
