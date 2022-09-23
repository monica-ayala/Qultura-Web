const db = require('../util/database');
//const bcrypt = require('bcryptjs');

module.exports = class Evento{

    constructor(info_evento,fecha_hora_evento,multimedia_evento,ubicacion_evento) {
        this.info_evento = info_evento,
        this.fecha_hora_evento = fecha_hora_evento,
        this.multimedia_evento = multimedia_evento,
        this.ubicacion_evento = ubicacion_evento
    }

    save() {
        return db.execute('INSERT INTO Evento(info_evento,fecha_hora_evento,multimedia_evento,ubicacion_evento) VALUES (?,?,?,?)', 
        [this.info_evento,this.fecha_hora_evento, this.multimedia_evento, this.ubicacion_evento] );
    }

    static fetchList(){
        return db.execute('SELECT * FROM Evento');
    }

    static fetchOne(id_evento){
        return db.execute('SELECT * FROM Evento WHERE id_evento = ?',[id_evento])
    }

    static softErase(id_evento){
        db.execute('DELETE FROM Evento_Tag WHERE id_evento_tag=?',[id_evento])
        .then(([rows,fieldData])=>{
            return db.execute('DELETE FROM Evento WHERE id_evento = ?' , [id_evento])
        })
        .catch((err=>console.log(err)))
        
    }
    static fecthOne(id_evento) {
        return db.execute('SELECT * FROM Evento WHERE id_evento=?',
            [id_evento]);
    }

    static fetchTags(){
        return db.execute('SELECT * FROM Tag');
    }

    static AsignTags(tags,ide_evento){
        return db.execute('INSERT INTO Evento_Tag (id_evento_tag, id_tag_evento) VALUES (?,?)',[ide_evento,tags])
    }

}