const db = require('../util/database');
//const bcrypt = require('bcryptjs');

module.exports = class Link{

    constructor(nombre_link, link) {
        this.link = link,
        this.nombre_link = nombre_link
    }

    save() {
        return db.execute('INSERT INTO Link(nombre_link, link) VALUES (?,?)', 
            [
                this.nombre_link,
                this.link
            ]    
        );
    }

    static fetchAll(){
        return db.execute('SELECT * FROM Link');
    }

    static eliminarLink(idLink){
        return db.execute('DELETE FROM Link WHERE id_link = ?', [idLink]);
    }

}