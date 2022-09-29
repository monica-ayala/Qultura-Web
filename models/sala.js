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

    static fetchListMuseum(id_museo){
        return db.execute('SELECT * FROM Sala WHERE id_museo_sala=?',[id_museo]);
    }

    static fetchOne(id_sala){
        return db.execute('SELECT * FROM Sala WHERE id_sala=?',
            [id_sala]);
    }

    static softErase(id_sala,value){
        return db.execute('UPDATE Sala SET status_sala=? WHERE id_sala = ?' , [value,id_sala])
    }

    static update(nom_sala,desc_sala,audio_sala,img_sala,id_sala) {
        return db.execute('UPDATE Sala SET nom_sala=?, desc_sala=?, audio_sala=?, img_sala=? WHERE id_sala=?',
                [ nom_sala,desc_sala,audio_sala,img_sala,id_sala ]
        );
    }
}