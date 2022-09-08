const db = require('../util/database');
//const bcrypt = require('bcryptjs');

module.exports = class Guia{

    constructor(id_guia, video_guia, desc_guia, icono_guia, nombre_guia, tip_guia, imagen_guia) {
        this.id_guia = id_guia,
        this.video_guia = video_guia,
        this.desc_guia = desc_guia,
        this.icono_guia = icono_guia,
        this.nombre_guia = nombre_guia,
        this.tip_guia = tip_guia,
        this.imagen_guia = imagen_guia
    }

    save() {
        return db.execute('INSERT INTO Guia(id_guia, video_guia, desc_guia, icono_guia, nombre_guia, tip_guia, imagen_guia) VALUES (?,?,?,?,?,?,?)', 
            [
                this.id_guia,
                this.video_guia, 
                this.desc_guia, 
                this.icono_guia, 
                this.nombre_guia, 
                this.tip_guia, 
                this.imagen_guia
            ]    
        );
    }
}