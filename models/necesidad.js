const db = require('../util/database');
//const bcrypt = require('bcryptjs');

module.exports = class Necesidad{

    constructor(necesidad) {
        this.necesidad = necesidad
    }

    save() {
    }

    static fetchAll(){
        return db.execute('SELECT s.id_solicitud_nececidad, n.id_necesidad, n.necesidad FROM Necesidad n, Solicitud_Necesidad s WHERE n.id_necesidad = s.id_necesidad_solicitud');
    }

}