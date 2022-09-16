const db = require('../util/database');
//const bcrypt = require('bcryptjs');

module.exports = class Museo{

    constructor(nom_museo,desc_museo,ubicacion_museo,link_ubi,num_museo,imgP_museo,imgB_museo,status) {
        this.nombre_museo = nom_museo,
        this.desc_museo = desc_museo,
        this.ubicacion_museo = ubicacion_museo,
        this.link_ubi = link_ubi,
        this.telefono_museo = num_museo,
        this.imagen_principal = imgP_museo,
        this.imagen_background = imgB_museo,
        this.status = 1
    }

    save() {
        return db.execute('INSERT INTO Museo(nom_museo,desc_museo,ubicacion_museo,link_ubi,num_museo,imgP_museo,imgB_museo,status) VALUES (?,?,?,?,?,?,?,?)', 
                [
                    this.nombre_museo,this.desc_museo,this.ubicacion_museo,this.link_ubi,this.telefono_museo,this.imagen_principal,this.imagen_background,1
                ]    
        );
    }

    static fetchList(){
        return db.execute('SELECT * FROM Museo');
    }

    static fecthOne(id_museo) {
        return db.execute('SELECT * FROM Museo WHERE id_museo=?',
            [id_museo]);
    }

    static update_museo(id_museo) {
        return db.execute('UPDATE Museo SET nom_museo=?, desc_museo=?, ubicacion_museo=?, link_ubi=?, num_museo=?, imgP_museo=?, imgB_museo=?, WHERE id_museo=?',
                [
                    nom_museo,desc_museo,ubicacion_museo,link_ubi,num_museo,imgP_museo,imgB_museo
                ]
        );
    }

}