const db = require('../util/database');
//const bcrypt = require('bcryptjs');

module.exports = class Necesidad{
    // Constructor method for necesidad
    constructor(necesidad) {
        this.necesidad = necesidad
    }

    // Method for necesidad
    static fetchAll(){
        return db.execute('SELECT s.id_solicitud_nececidad, n.id_necesidad, n.necesidad FROM Necesidad n, Solicitud_Necesidad s WHERE n.id_necesidad = s.id_necesidad_solicitud');
    }

}