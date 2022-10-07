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
  Solicitud.fetchOne(request.body.id_solicitud)
    .then(([rowsOneSolicitud, fieldDataOne]) => {
      Museo.fetchidUsuario(rowsOneSolicitud[0].id_museo_solicitud)
        .then(([rowsMuseoUsuario, fieldDataMuseoUsuario]) => {
          User.fetchMuseoCorreo(rowsMuseoUsuario[0].id_user_museo)
            .then(([rowsUsuarioMuseo, fieldDataUsuarioMuseo]) => { //rowsUsuarioMuseo[0].correo_user
              Solicitud.correoElimina_send(rowsOneSolicitud[0].id_solicitud, 'A01706897@tec.mx', rowsOneSolicitud[0].info_adicional, rowsOneSolicitud[0].fecha_hora_sol, rowsOneSolicitud[0].num_asistentes) 
              Solicitud.deleteOne(request.body.id_solicitud)
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  }).catch(err => console.log(err));
};

  exports.agrega_solicitud=(request,response,next)=>{
    var date = new Date();
	  var current_time = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
    const solicitud_nueva = new Solicitud(request.body.info_adicional, current_time, request.body.fecha_hora_sol, request.body.num_Visitantes, request.body.id_museo, request.body.usuario_necesidad);
    Museo.fetchidUsuario(request.body.id_museo)
      .then(([rowsMuseoUsuario, fieldDataMuseoUsuario]) => {
        User.fetchMuseoCorreo(rowsMuseoUsuario[0].id_user_museo)
          .then(([rowsUsuarioMuseo, fieldDataUsuarioMuseo]) => { //rowsUsuarioMuseo[0].correo_user
            console.log(rowsUsuarioMuseo[0].correo_user)
            solicitud_nueva.solicitud_save()
              .then(() => {
                if(request.body.necesidades.length != 0){
                  Solicitud.solicitud_fetch_lastinsertion()
                    .then(([rowLastSolicitud, fieldDatalastSolicitud]) => {
                      Solicitud.correo_send(rowLastSolicitud[0].LastSolicitud, request.body.necesidades_text , 'A01706897@tec.mx', request.body.info_adicional, request.body.fecha_hora_sol, request.body.num_Visitantes)
                      for(var i = 0; i < request.body.necesidades.length; i++){
                        Solicitud.necesidades_save(rowLastSolicitud[0].LastSolicitud, request.body.necesidades[i],request.body.info_adicional,request.body.fecha_hora_sol, request.body.num_Visitantes,)
                        .then(response.status(200).json({}))
                        .catch(err => console.log(err));
                      }
                    }).catch(err => console.log(err));
                }
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
      }).catch(err => console.log(err));
  };

  exports.updateAceptar_solicitud=(request,response,next)=>{
    const id_status = request.params.id_status
    Solicitud.aceptar_status(id_status)
    .then(([rowsUpdate,fieldData])=>{
      response.render('update_solicitud');
    }).catch(err => console.log(err));
  };

  exports.updateNegar_solicitud=(request,response,next)=>{
    const id_status = request.params.id_status
    Solicitud.negar_status(id_status)
    .then(([rowsUpdate,fieldData])=>{
      response.render('update_solicitud');
    }).catch(err => console.log(err));
  };
