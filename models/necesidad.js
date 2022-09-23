const db = require('../util/database');
//const bcrypt = require('bcryptjs');

module.exports = class Necesidad{

    constructor() {
    }

    save() {
    }

    static fetchAll(){
        return db.execute('SELECT s.id_solicitud_necesidad, n.id_necesidad, n.necesidad FROM Necesidad n, Solicitud_Necesidad s WHERE n.id_necesidad = s.id_necesidad_solicitud');
    }

}