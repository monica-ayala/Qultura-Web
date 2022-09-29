const db = require('../util/database');
const bcrypt = require('bcryptjs');

 module.exports = class Usuario{
     constructor(nombre, correo, contrasena) {
         this.nom_user = nombre,
         this.correo_user = correo,
         this.password_user = contrasena,
         this.id_rol = 4
     }

     save() {

        return bcrypt.hash(this.password_user, 12)
        .then((hashed_password)=>{
            return db.execute('INSERT INTO User(nom_user,correo_user,password_user,id_rol) VALUES (?,?,?,?)', 
            [
                this.nom_user,this.correo_user,hashed_password,this.id_rol
            ]    
    );
            }).catch((err) =>{    
            console.log(err);
        });
    }

    static AssignMuseo(ide_user){
        return db.execute('INSERT INTO User_Museo(id_user_museo, id_museo_user) VALUES (?,?)', [ide_user,1])
    }
    ///Unir con Museo
     static fetchList(){
        return db.execute('SELECT * FROM User u, Rol r, User_Museo um, Museo m WHERE u.id_rol = r.id_rol AND u.id_user=um.id_user_museo AND um.id_museo_user = m.id_museo ');
    }

    static findOne(correos_user) {
        return db.execute('SELECT * FROM User WHERE correo_user=?',
            [correos_user]);
    }

    static roles(){
        return db.execute('SELECT * FROM Rol');
    }

    static fecthOne(ide_user){
        //return db.execute('SELECT * FROM User u, Rol r WHERE u.id_user=? AND u.id_rol = r.id_rol ',[ide_user]);
        return db.execute('SELECT * FROM User u, Rol r, User_Museo um, Museo m WHERE u.id_user=? AND u.id_rol = r.id_rol AND u.id_user = um.id_user_museo AND um.id_museo_user = m.id_museo',[ide_user]);

    }

    static update(ide_rol,ide_user){
        return db.execute('UPDATE User SET id_rol =? WHERE id_user =?',[ ide_rol,ide_user])
    }

    static updateMuseum(ide_user,ide_museo){
        //return db.execute('INSERT INTO User_Museo(id_user_museo, id_museo_user) VALUES (?,?)', [ide_user,ide_museo])
        return db.execute('UPDATE User_Museo SET id_museo_user=? WHERE id_user_museo=?', [ide_museo,ide_user])
        
    }

    static getId(login)
    {
        return db.execute('SELECT id_user FROM User WHERE correo_user=?',
            [login])
        .then()
        .catch((err) => {console.log(err);});
    }

    
 }