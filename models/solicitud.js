const db = require('../util/database');
//const bcrypt = require('bcryptjs');

module.exports = class Solicitud{

    constructor() {
        //Tu puedes Sacevedo
    }

    save() {
    }

    static fetchAll(){
        return db.execute('SELECT * FROM Solicitud');
    }

}