const db = require('../util/database');
const dotenv = require('dotenv');

const nodemailer= require('nodemailer');
const { callbackPromise } = require('nodemailer/lib/shared');
const transporter= nodemailer.createTransport({
    service: "hotmail",
    auth : {
        user: "no_reply_quapp@outlook.com",
        pass: "U4@4*s*7mqjF"
    }
});

var user = "no_reply_quapp@outlook.com"
var pass = "U4@4*s*7mqjF"

// Modelo de Solicitudes 
// Se realizan las llamadas hacia la base de datos
// Tanto inserciones como seleccionar informacion en especifico
// de las solicitudes en movil y correos electronicos


module.exports = class Solicitud {

    constructor(info_adicional, fecha_hora, fecha_hora_sol, num_asistentes, id_museo_solicitud, id_user_solicitud) {
        this.info_adicional = info_adicional;
        this.fecha_hora = fecha_hora;
        this.fecha_hora_sol = fecha_hora_sol;
        this.num_asistentes = num_asistentes;
        this.id_museo_solicitud = id_museo_solicitud;
        this.id_user_solicitud = id_user_solicitud;
    }

    solicitud_save() {
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

    static fetchOne(id_solicitud){
        return db.execute('SELECT id_solicitud, info_adicional, fecha_hora, fecha_hora_sol, num_asistentes, id_museo_solicitud, id_user_solicitud FROM Solicitud WHERE id_solicitud = ?', [id_solicitud]);
    }

    static fetchAll(id_usuario){
        return db.execute('SELECT id_solicitud, info_adicional, fecha_hora, fecha_hora_sol, num_asistentes, s.status, m.nom_museo, m.imgP_museo, id_user_solicitud FROM Solicitud s, Museo m WHERE s.id_museo_solicitud = m.id_museo AND s.id_user_solicitud = ?', [id_usuario]);
    }

    static fetchEverything(){
        return db.execute('SELECT * FROM Solicitud');
    }

    static deleteOne(id_solicitud){
        db.execute('DELETE FROM Solicitud_Necesidad WHERE id_solicitud_necesidad = ?', [id_solicitud])
            .then(([rows, fieldData]) => {
                return db.execute('DELETE FROM Solicitud WHERE id_solicitud = ?', [id_solicitud])
            })
            .catch(err => console.log(err));
    }

    static correo_send(id_solicitud, necesidades, correo_museo, info_adicional, fecha_hora_sol, num_Visitantes, usuario_necesidad){
        const options= {
            from: "no_reply_quapp@outlook.com",
            to: correo_museo,
            subject: "Solicitud especial de recorrido",
            text: "Caracteristicas de solicitud \n  Usuario: " + usuario_necesidad + " \n Fecha y hora: " + fecha_hora_sol + "\n Numero de asistentes: " + num_Visitantes + "\n Requerimientos especiales: " + necesidades + "\n Otro: " + info_adicional + "\n Click aqui para confirmar solicitud : https://qulturaqro.live/solicitud/aceptar/"+id_solicitud  + "\n Click aqui para denegar la solicitud : https://qulturaqro.live/solicitud/negar/"+id_solicitud
        };
        transporter.sendMail(options,callbackPromise());
    }


    static correoElimina_send(id_solicitud, correo_museo, info_adicional, fecha_hora_sol, num_Visitantes){
        const options= {
            from: "no_reply_quapp@outlook.com",
            to: correo_museo,
            subject: "Cancelacion de solicitud de recorrido",
            text: "Se realizo una cancelaci??n para la solicitud de recorrido con id: " + id_solicitud + ".\n Caracteristicas de solicitud \n  Fecha y hora: " + fecha_hora_sol + "\n Numero de asistentes: " + num_Visitantes
        };
        transporter.sendMail(options,callbackPromise());
    }

    static correoRecordatorio_send(id_solicitud, correo_usuario, info_adicional, fecha_hora_sol, num_Visitantes, nombreMuseo){
        const options= {
            from: "no_reply_quapp@outlook.com",
            to: correo_usuario,
            subject: "Hoy es tu recorrido de museo",
            text: "Tienes una cita hoy en el museo: " + nombreMuseo + ". \n" + "Informacion de la cita \n" +  "fecha: " + fecha_hora_sol + "\n numero de visitantes: " + num_Visitantes  
        };
        transporter.sendMail(options,callbackPromise());
    }

    static necesidades_save(id_solicitud, id_necesidad){
        return db.execute('INSERT INTO Solicitud_Necesidad (id_solicitud_necesidad, id_necesidad_solicitud) VALUES (?, ?)', 
            [
                id_solicitud,
                id_necesidad
            ]
        )
    }

    static aceptar_status(id_solicitud){
        return db.execute('UPDATE Solicitud SET status =? WHERE id_solicitud =?',[ 2 , id_solicitud])  
    }

    static negar_status(id_solicitud){
        return db.execute('UPDATE Solicitud SET status =? WHERE id_solicitud =?',[ 3 , id_solicitud])  
    }

}