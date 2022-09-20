const db = require('../util/database');
//const bcrypt = require('bcryptjs');

module.exports = class Solicitud{

    constructor() {
        //Tu puedes Sacevedo
    }

    save() {
    }

    static fetchAll(){
        return db.execute('SELECT id_solicitud, info_adicional, fecha_hora, fecha_hora_sol, num_asistentes, s.status, m.nom_museo, id_user_solicitud FROM Solicitud s, Museo m WHERE s.id_museo_solicitud = m.id_museo');
    }

}