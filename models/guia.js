const db = require('../util/database');
//const bcrypt = require('bcryptjs');

module.exports = class Guia{

    constructor(video_guia, desc_guia, icono_guia, nombre_guia, tip_guia, imagen_guia) {
        this.video_guia = video_guia,
        this.desc_guia = desc_guia,
        this.icono_guia = icono_guia,
        this.nombre_guia = nombre_guia,
        this.tip_guia = tip_guia,
        this.imagen_guia = imagen_guia
    }

    save() {
        return db.execute('INSERT INTO Guia(video_guia, desc_guia, icono_guia, nombre_guia, tip_guia, imagen_guia) VALUES (?,?,?,?,?,?)', 
            [
                this.video_guia, 
                this.desc_guia, 
                this.icono_guia, 
                this.nombre_guia, 
                this.tip_guia, 
                this.imagen_guia
            ]    
        );
    }

    static fetchAll(){
        return db.execute('SELECT * FROM Guia');
    }

    static fetchGuiaEditar(idGuia){
        return db.execute("SELECT * FROM Guia WHERE id_guia = ?", [idGuia]);
    }

    
    static editar(video, descripcion, icono, nombre, tip, id_guia){
        return db.execute('UPDATE guia SET video_guia = ?, desc_guia = ?, icono_guia = ?, nombre_guia = ?, tip_guia = ? WHERE id_guia = ?', [video, descripcion, icono, nombre, tip, id_guia]);
    }
}