const path = require("path");
const filesystem = require('fs');
const Solicitud = require("../models/solicitud");
const Necesidad = require("../models/necesidad");
const Museo = require("../models/museo");
const User = require("../models/usuario")
var cron = require('node-cron');

var current;
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
cron.schedule('0 11 * * *', () => {
  var date = new Date()
  var today = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear();
  Solicitud.fetchEverything()
      .then(([rows, fieldData]) => {
          for(var i = 0; i < rows.length; i++){
              if((rows[i].fecha_hora_sol.toString()).substring(4,15) == today){
                  current = rows[i]
                  User.fetchMuseoCorreo(rows[i].id_user_solicitud)
                      .then(([rowsUsuarioMuseo, fieldDataUsuarioMuseo]) => {
                          Museo.fetchMuseoName(current.id_museo_solicitud)
                              .then(([rowsMuseoName, fieldDataMuseoName]) => {
                                  Solicitud.correoRecordatorio_send(current.id_solicitud, rowsUsuarioMuseo[0].correo_user, current.info_adicional, current.fecha_hora_sol, current.num_Visitantes, rowsMuseoName[0].nom_museo)
                              }).catch(err => console.log(err));
                  }).catch(err => console.log(err));
              }
          }  
  }).catch(err => console.log(err));
})

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
              Solicitud.correoElimina_send(rowsOneSolicitud[0].id_solicitud, rowsUsuarioMuseo[0].correo_user, rowsOneSolicitud[0].info_adicional, rowsOneSolicitud[0].fecha_hora_sol, rowsOneSolicitud[0].num_asistentes) 
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
          .then(([rowsUsuarioMuseo, fieldDataUsuarioMuseo]) => {
            solicitud_nueva.solicitud_save()
              .then(() => {
                if(request.body.necesidades.length != 0){
                  Solicitud.solicitud_fetch_lastinsertion()
                    .then(([rowLastSolicitud, fieldDatalastSolicitud]) => {
                      Solicitud.correo_send(rowLastSolicitud[0].LastSolicitud, request.body.necesidades_text , rowsUsuarioMuseo[0].correo_user, request.body.info_adicional, request.body.fecha_hora_sol, request.body.num_Visitantes)
                      for(var i = 0; i < request.body.necesidades.length; i++){
                        Solicitud.necesidades_save(rowLastSolicitud[0].LastSolicitud, request.body.necesidades[i],request.body.info_adicional,request.body.fecha_hora_sol, request.body.num_Visitantes,)
                        .catch(err => console.log(err));
                      }
                      response.status(200).json({})
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
