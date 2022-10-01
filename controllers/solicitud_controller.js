const path = require("path");
const filesystem = require('fs');
const Solicitud = require("../models/solicitud");
const Necesidad = require("../models/necesidad");
const Museo = require("../models/museo");
const User = require("../models/usuario")


exports.get_solicitudes=(request,response,next)=>{
  Solicitud.fetchAll(request.params.id_usuario)
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
    var date = new Date();
	  var current_time = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
    const solicitud_nueva = new Solicitud(request.body.info_adicional, current_time, request.body.fecha_hora_sol, request.body.num_Visitantes, 2, request.body.usuario_necesidad);
    //Museo.fetchidUsuario(request.body.id_museo)
      //.then(([rowsMuseoUsuario, fieldDataMuseoUsuario]) => {
        //User.fetchMuseoCorreo(rowsMuseoUsuario[0].id_user_museo)
          //.then(([rowsUsuarioMuseo, fieldDataUsuarioMuseo]) => { rowsUsuarioMuseo[0].correo_user
            solicitud_nueva.solicitud_save()
              .then(() => {
                if(request.body.necesidades.length != 0){
                  Solicitud.solicitud_fetch_lastinsertion()
                    .then(([rowLastSolicitud, fieldDatalastSolicitud]) => {
                      Solicitud.correo_send(rowLastSolicitud[0].LastSolicitud, request.body.necesidades_text , 'A01707035@tec.mx', request.body.info_adicional, request.body.fecha_hora_sol, request.body.num_Visitantes)
                      for(var i = 0; i < request.body.necesidades.length; i++){
                        console.log(rowLastSolicitud)
                        Solicitud.necesidades_save(rowLastSolicitud[0].LastSolicitud, request.body.necesidades[i],request.body.info_adicional,request.body.fecha_hora_sol, request.body.num_Visitantes,)
                        .then()
                        .catch(err => console.log(err));
                      }
                    }).catch(err => console.log(err));
                }
            }).catch(err => console.log(err));
        //}).catch(err => console.log(err));
      //}).catch(err => console.log(err));
  };

  exports.updateAceptar_solicitud=(request,response,next)=>{
    const id_status = request.params.id_status
    Solicitud.aceptar_status(id_status)
    .then(([rowsUpdate,fieldData])=>{
      response.status(200).json({});
    }).catch(err => console.log(err));
  };

  exports.updateNegar_solicitud=(request,response,next)=>{
    const id_status = request.params.id_status
    Solicitud.negar_status(id_status)
    .then(([rowsUpdate,fieldData])=>{
      response.status(200).json({});
    }).catch(err => console.log(err));
  };
