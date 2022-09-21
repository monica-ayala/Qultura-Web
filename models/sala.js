const db = require('../util/database');
//const bcrypt = require('bcryptjs');

module.exports = class Sala{

    constructor(nom_sala,desc_sala,audio_sala,img_sala,id_museo_sala) {
        this.nom_sala = nom_sala,
        this.desc_sala = desc_sala,
        this.audio_sala = audio_sala,
        this.img_sala = img_sala,
        this.status_sala = 1
        this.id_museo_sala = id_museo_sala
    }

    save() {
        return db.execute('INSERT INTO Sala(nom_sala,desc_sala,audio_sala,img_sala,status_sala,id_museo_sala) VALUES (?,?,?,?,?,?)', 
        [this.nom_sala,this.desc_sala,this.audio_sala,this.img_sala,this.status_sala,this.id_museo_sala] );
    }

    static fetchList(){
        return db.execute('SELECT * FROM Sala');
    }
}