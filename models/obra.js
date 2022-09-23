const db = require('../util/database');
//const bcrypt = require('bcryptjs');

module.exports = class Obra{

    constructor(nom_obra,audio_obra,subtitulo_obra,img_obra,fecha_obra,autor_obra,desc_obra,id_sala) {
        this.nom_obra = nom_obra,
        this.audio_obra = audio_obra,
        this.subtitulo_obra = subtitulo_obra,
        this.img_obra=img_obra,
        this.fecha_obra = fecha_obra,
        this.autor_obra = autor_obra,
        this.desc_obra = desc_obra,
        this.id_sala = id_sala

    }

    save() {
        return db.execute('INSERT INTO Obra(nom_obra,audio_obra,subtitulo_obra,img_obra,fecha_obra,autor_obra,desc_obra,id_sala) VALUES (?,?,?,?,?,?,?,?)', 
        [this.nom_obra,this.audio_obra,this.subtitulo_obra,this.img_obra,this.fecha_obra,this.autor_obra,this.desc_obra,this.id_sala] );
    }

    static fetchList(id_sala){
        return db.execute('SELECT * FROM Obra WHERE id_sala=?',[id_sala]);
    }

    static fetchOne(id_obra){
        return db.execute('SELECT * FROM Obra WHERE id_obra=?',
            [id_obra]);
    }

    static update(nom_obra,audio_obra,subtitulo_obra,img_obra,fecha_obra,autor_obra,desc_obra,id_obra) {
        return db.execute('UPDATE Obra SET nom_obra=?,audio_obra=?,subtitulo_obra=?,img_obra=?,fecha_obra=?,autor_obra=?,desc_obra=? WHERE id_obra=?',
                [ nom_obra,audio_obra,subtitulo_obra,img_obra,fecha_obra,autor_obra,desc_obra,id_obra ]
        );
    }

    static delete(id_obra){
        return db.execute('DELETE FROM Obra WHERE id_obra=?',[id_obra])        
    }
}