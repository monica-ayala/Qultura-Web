 const db = require('../util/database');
// const bcrypt = require('bcryptjs');

 module.exports = class Usuario{
     constructor(nombre, correo, contrasena) {
         this.nom_user = nombre,
         this.correo_user = correo,
         this.password_user = contrasena,
         this.id_rol = 4
     }

     save() {
        return db.execute('INSERT INTO User(nom_user,correo_user,password_user,id_rol) VALUES (?,?,?,?)', 
                [
                    this.nom_user,this.correo_user,this.password_user,this.id_rol
                ]    
        );
    }
    ///Unir con Museo
     static fetchList(){
        return db.execute('SELECT * FROM User');
    }

    static findOne(correos_user) {
        return db.execute('SELECT * FROM User WHERE correo_user=?',
            [correos_user]);
    }

    static roles(){
        return db.execute('SELECT * FROM Rol');
    }

 }