const db = require('../util/database');
//const bcrypt = require('bcryptjs');

module.exports = class Link{

    constructor(link, nombre_link) {
        this.link = link,
        this.nombre_link = nombre_link
    }


    static fetchAll(){
        return db.execute('SELECT * FROM Link');
    }

}