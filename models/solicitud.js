const db = require('../util/database');
//const bcrypt = require('bcryptjs');

const nodemailer= require('nodemailer');
const { callbackPromise } = require('nodemailer/lib/shared');
const transporter= nodemailer.createTransport({
    service: "hotmail",
    auth : {
        user:"Qultura_no_reply@outlook.com",
        pass: "U4@4*s*7mqjF"
    }
});


module.exports = class Solicitud{

    constructor(info_adicional, fecha_hora, fecha_hora_sol, num_asistentes, id_museo_solicitud, id_user_solicitud) {
        this.info_adicional = info_adicional;
        this.fecha_hora = fecha_hora;
        this.fecha_hora_sol = fecha_hora_sol;
        this.num_asistentes = num_asistentes;
        this.id_museo_solicitud = id_museo_solicitud;
        this.id_user_solicitud = id_user_solicitud;
    }

    solicitud_save(necesidades, correo_museo) {
        const options= {
            from: "ticketz_no_reply@outlook.com",
            to: correo_museo,
            subject: "Solicitud especial de recorrido",
            text: "Caracteristicas de solicitud \n  Fecha y hora: " + this.fecha_hora_sol + "\n Numero de asistentes: " + this.num_asistentes + "\n Requerimientos especiales: " + necesidades + "\n Otro: " + this.info_adicional
        };
        transporter.sendMail(options,callbackPromise());
        return db.execute('INSERT INTO Solicitud (info_adicional, fecha_hora, fecha_hora_sol, num_asistentes, status,id_museo_solicitud,id_user_solicitud) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [
                this.info_adicional,
                this.fecha_hora,
                this.fecha_hora_sol, 
                this.num_asistentes,
                1, 
                this.id_museo_solicitud,
                this.id_user_solicitud
            ]    
        );
    }

    static solicitud_fetch_lastinsertion(){
        return db.execute('SELECT(SELECT MAX(id_solicitud) FROM Solicitud s) AS LastSolicitud');
    }

    static fetchAll(id_usuario){
        return db.execute('SELECT id_solicitud, info_adicional, fecha_hora, fecha_hora_sol, num_asistentes, s.status, m.nom_museo, m.imgP_museo, id_user_solicitud FROM Solicitud s, Museo m WHERE s.id_museo_solicitud = m.id_museo AND s.id_usuario = ?', [id_usuario]);
    }

    static deleteOne(id_solicitud){
        db.execute('DELETE FROM Solicitud_Necesidad WHERE id_solicitud_necesidad = ?', [id_solicitud])
            .then(([rows, fieldData]) => {
                return db.execute('DELETE FROM Solicitud WHERE id_solicitud = ?', [id_solicitud])
            })
            .catch(err => console.log(err));
    }

    static necesidades_save(id_solicitud, id_necesidad){
        return db.execute('INSERT INTO Solicitud_Necesidad (id_solicitud_necesidad, id_necesidad_solicitud) VALUES (?, ?)', 
            [
                id_solicitud,
                id_necesidad
            ]
        )
    
    }

}