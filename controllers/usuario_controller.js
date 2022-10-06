const path = require("path");
const Usuario = require("../models/usuario");
const Museos = require("../models/museo");
const filesystem = require('fs');
const bcrypt = require("bcryptjs");
const { response } = require("express");
const { redirect } = require("express/lib/response");

 
exports.view = (request, response, next) => {
  Usuario.fetchList()
  .then(([rowsUsers,fieldData])=>{
    response.render('rbac_registrar',{
      usuarios:rowsUsers});
    }).catch(err=>console.log(err));
  };
   


 exports.signup_get = (request, response, next) => {
  response.render('signup');
 };


 exports.signup_post = (request, response, next) => {
  const nuevo_usuario = new Usuario(
    request.body.us_nombre,
    request.body.us_correo,
    request.body.us_password
  );

  Usuario.findOne(request.body.us_correo)
  .then(([rows,fieldData])=>{
    if (rows.length==0){
      nuevo_usuario.save()
      .then((result)=>{
        Usuario.AssignMuseo(result[0].insertId)
        .then(()=>{
          response.redirect("/usuario/login");
        })
        .catch(err=>console.log(err));
      })
      .catch(err=>console.log(err));
    }else{
      response.redirect("/usuario/signup");
    }
  })
  .catch((err) => {
    console.log(err);
  });
};

exports.login_get = (request, response, next) => {
  response.render("login", {
    correo: request.session.correo ? request.session.correo : "",
    info: "",
  });
};

exports.login_post = (request, response, next) => {
  Usuario.findOne(request.body.us_correo)
    .then(([rows, fielData]) => {
      if (rows.length < 1 || rows[0].id_rol !== 4) {
        response.status(200).json({ errores: 1 });
      } else {
        const usuario = new Usuario(
          rows[0].nom_user,
          rows[0].correo_user,
          rows[0].password_user,
          rows[0].id_rol
        );
        bcrypt
          .compare(request.body.us_password, usuario.password_user)
          .then((doMatch) => {
            let error = 1;
            if (doMatch) {
              error = 0;
              request.session.isLoggedIn = true;
              request.session.usuario = usuario;
              request.session.correo = usuario.correo_user;
              Usuario.getId(request.session.correo)
                .then(([rowsid, fieldData]) => {
                  request.session.id_usuario = rowsid[0].Id_Usuario;
                  return request.session.save((err) => {
                    response.redirect("/");
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              response.status(200).json({ errores: error });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    //   else{
        
    //   const usuario = new Usuario(
    //     rows[0].nom_user,
    //     rows[0].correo_user,
    //     rows[0].password_user,
    //     rows[0].id_rol
    //     //rows[0]["Contraseña"],
    //   );
    //   bcrypt.compare(request.body.us_password, usuario.password_user)
    //     .then((doMatch) => {
    //       let error = 1;
    //       if (doMatch) {
    //               error = 0;
    //               request.session.isLoggedIn = true;
    //               request.session.usuario = usuario;
    //               request.session.correo = usuario.correo_user;
    //               Usuario.getId(request.session.correo)
    //                 .then(([rowsid, fieldData]) => {
    //                   request.session.id_usuario = rowsid[0].id_user;
    //                     Usuario.getMuseum(rowsid[0].id_user)
    //                       .then(([rowsMusuem,fielData])=>{
    //                         request.session.id_museo = rowsMusuem[0].id_museo_user;
    //                         return request.session.save((err) => {
    //                           //response.status(200).json({ errores: error });  // entender esto
    //                           response.redirect("/")
    //                         }); 
    //                       }).catch((err)=>{
    //                         console.log(err)
    //                       })
    //                       // Aún no se implementa privilegios/RBAC Entonces no se requiere aún esto.
    //                       // let privilegios = [];
    //                       // for (let privilegio in rowsprivilegios) {
    //                       //   privilegios.push(rowsprivilegios[privilegio].Id_Privilegio);
    //                       // }
    //                       // request.session.privilegios = privilegios;
                         
    //                 })
    //                 .catch((err) => {
    //                   console.log(err);
    //                 });
    //       } else {
    //         response.status(200).json({ errores: error });
    //       }

    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
    })
    .catch((error) => {
      console.log(error);
    });
};

 exports.login_movil_get = (request,response,next)=>{

 }

 exports.login_movil_post =(request,response,next)=>{
  Usuario.findOne(request.body.us_correo)
  .then(([rows,fieldData])=>{
    if(rows.length == 1){
      response.status(200).json({
        usuario:rows
      })
    }
  }).catch((err)=>{
    console.log(err);
  })

 }

 exports.signup_post_movil = (request, response, next) => {
  const nuevo_usuario = new Usuario(
    request.body.us_nombre,
    request.body.us_correo,
    request.body.us_password
  );

  Usuario.findOne(request.body.us_correo)
  .then(([rows,fieldData])=>{
    if (rows.length==0){
      nuevo_usuario.save()
      .then((result)=>{
        Usuario.AssignMuseo(result[0].insertId)
        .then(()=>{
          response.status(200).json({
            paso:1
          });
        })
        .catch(err=>console.log(err));
      })
      .catch(err=>console.log(err));
    }else{
      response.status(200).json({
        paso:0
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });
};


// exports.logout = (request, response, next) => {
// };

 exports.updateUsuario = (request, response, next) => {

  Usuario.fecthOne(request.params.id_usuario)
  .then(([rowUser,fieldData])=>{
    Usuario.roles()
    .then(([rowsRoles,fieldData])=>{
      Museos.fetchList()
      .then(([rowsMuseos,fieldData])=>{
        response.status(200).json({
          roles:rowsRoles,
          museos:rowsMuseos,
          usuario:rowUser
        });
      }).catch(err=>console.log(err));
    }).catch(err=>console.log(err));
    
  }).catch(err=>console.log(err));
 
 };

 exports.sendUpdate=(request,response,next)=>{
  Usuario.update(request.body.id_rol,request.body.id_user)
    .then(([rows,fieldData])=>{ 
      Usuario.updateMuseum(request.body.id_user,request.body.id_museo)
      .then(([rowsMuseo,fieldData])=>{
        request.session.id_museo = request.body.id_museo;
        response.status(200).json({})
      }).catch(err=>console.log(err));
    }).catch(err=>console.log(err));

  
 }

 exports.logout = (request, response, next) => {
  if (request.session !== "undefined") {
    request.session.destroy(() => {
      response.redirect("/usuario/login");
    });
  } else {
    response.redirect("/");
  }
};

exports.getUser = (request,response,next)=>{
  response.status(200).json({
    username: request.session.usuario.nom_user
  })
}

exports.erase = (request,response,next)=>{
  Usuario.softErase(request.params.id_user)
  Usuario.fetchList()
  .then(([rowsUsers,fieldData])=>{
    response.status(200).json({
      users: rowsUsers
    })
    }).catch(err=>console.log(err));
};
