const path = require("path");
const Usuario = require("../models/usuario");
const Museos = require("../models/museo");
const filesystem = require('fs');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const { response } = require("express");
const { redirect } = require("express/lib/response");
const dotenv = require('dotenv');

dotenv.config();

//view
//Permite renderizar la vista de Usuarios y Privilegios 
// teninendo en cuenta el rol

exports.view = (request, response, next) => {
  if(request.session.id_rol == 4 || request.session.id_rol == 3){
    Usuario.fetchList()
    .then(([rowsUsers,fieldData])=>{
      response.render('rbac_registrar',{
        usuarios:rowsUsers,
        rol:request.session.id_rol
      });
      }).catch(err=>console.log(err));
  }else{
    response.redirect('/')
  }

}
   

// signup_get
// Renderiza la vista de registro

 exports.signup_get = (request, response, next) => {
  response.render('signup');
 };

// signup_post
// Al intentar registrar un usuario primero se verifica que no exista previamente
// en el caso de que no sea asi se registrara dentro del sistema

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

//login_get
// Carga la página de Inicio de sesion

exports.login_get = (request, response, next) => {
  response.render("login", {
    correo: request.session.correo ? request.session.correo : "",
    info: "",
  });
};

// login_post
// Al exitosamente realizar el login, se crea una sesion con diversos 
// atributos

exports.login_post = (request, response, next) => {
  Usuario.findOne(request.body.us_correo)
    .then(([rows, fielData]) => {
      if (rows.length < 1 ) {
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
                  request.session.id_usuario = rowsid[0].id_user;
                  request.session.id_rol =rows[0].id_rol;
                  Usuario.getMuseum(rowsid[0].id_user)
                  .then(([rowsMuseum])=>{
                    request.session.id_museo = rowsMuseum[0].id_museo_user
                    const accessToken = jwt.sign({ usuario: usuario }, process.env.TOKEN_SECRET);
                    request.session.auth = accessToken
                    return request.session.save((err) => {
                      response.redirect("/");
                    });
                  }).catch((err)=>{
                    console.log(err);
                  })
                  
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
    })
    .catch((error) => {
      console.log(error);
    });
};

 exports.login_movil_get = (request,response,next)=>{

 }

// login_movil_post
// Controlador utilizado por la aplicacion movil para 
// lograr verificar el inicio de sesion

 exports.login_movil_post =(request,response,next)=>{
  Usuario.findOne(request.body.us_correo)
  .then(([rows, fielData]) => {
    if (rows.length < 1) {
      response.status(200).json({ usuario: rows });
    }
    else{
    const usuario = new Usuario(
      rows[0].nom_user,
      rows[0].correo_user,
      rows[0].password_user,
      rows[0].id_rol
    );
    bcrypt.compare(request.body.us_password, usuario.password_user)
      .then((doMatch) => {
        if (doMatch) {
          response.status(200).json({ usuario: rows });
        } else {
          rows = []
          response.status(200).json({ usuario: rows });
        }

      })
      .catch((err) => {
        console.log(err);
      });
  }
  })
  .catch((error) => {
    console.log(error);
  });
 };

 // signup_post_movil
 // Controlador para lograr el registro de usuarios
 // desde la aplicacion movil

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


// updateUsuario
// permite ver las posibles opciones para modificar a un
// usuario, tanto su rol como asignacion de museo

 exports.updateUsuario = (request, response, next) => {
if(request.session.id_rol==4){
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
}else{
  response.redirect('/')
}
  
 };

 // sendUpdate
 // Se ejecuta al guardar los cambios de los usuarios
 // tanto rol como administrador y se realiza la nueva 
 // asignacion

 exports.sendUpdate=(request,response,next)=>{
  if(request.session.id_rol==4){
    
  Usuario.update(request.body.id_rol,request.body.id_user)
  .then(([rows,fieldData])=>{ 
    Usuario.updateMuseum(request.body.id_user,request.body.id_museo)
    .then(([rowsMuseo,fieldData])=>{
      if (request.body.id_user == request.session.id_usuario){
      request.session.id_museo = request.body.id_museo;
      request.session.id_rol=request.body.id_rol;
      }
      response.status(200).json({})
    }).catch(err=>console.log(err));
  }).catch(err=>console.log(err));
  }else{
    response.redirect('/')
  }
 }

 // logout
 // Destruye la sesion por lo que ya no se puede hacer
 // uso de la aplicacion web
 exports.logout = (request, response, next) => {
  if (request.session !== "undefined") {
    request.session.destroy(() => {
      response.redirect("/usuario/login");
    });
  } else {
    response.redirect("/");
  }
};

// getUser
// Obtener usuario apartir de la sesion para mensaje 
// personalizado
exports.getUser = (request,response,next)=>{
  response.status(200).json({
    username: request.session.usuario.nom_user
  })
}

// erase
// Borrar usuarios del sistema
exports.erase = (request,response,next)=>{
  if(request.session.id_rol ==4){
    Usuario.softErase(request.params.id_user)
    Usuario.fetchList()
    .then(([rowsUsers,fieldData])=>{
      response.status(200).json({
        users: rowsUsers
      })
      }).catch(err=>console.log(err)); 
  }
 };

 // create
 // Desde la pagina de Usuarios y Privilegios
 // Crear nuevos usuarios 
 
exports.create = (request,response,next)=>{
  if(request.session.id_rol==4){
    const nuevo_usuario = new Usuario(
      request.body.nombre,
      request.body.correo,
      request.body.password
    );
  
    Usuario.findOne(request.body.correo)
    .then(([rows,fieldData])=>{
      if (rows.length==0){
        nuevo_usuario.save()
        .then((result)=>{
          Usuario.AssignMuseo(result[0].insertId)
          .then(()=>{
            response.status(200).json({});
          })
          .catch(err=>console.log(err));
        })
        .catch(err=>console.log(err));
      }else{
        response.redirect("/");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }else{
    response.redirect('/')
  }

  
}