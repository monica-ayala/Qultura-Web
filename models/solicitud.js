const db = require('../util/database');
const dotenv = require('dotenv');
//const bcrypt = require('bcryptjs');

const nodemailer= require('nodemailer');
const { callbackPromise } = require('nodemailer/lib/shared');
const transporter= nodemailer.createTransport({
    service: "hotmail",
    auth : {
        user: process.env.MYSQL_ADDON_MAIL,
        pass: process.env.MYSQL_ADDON_MAILPASS
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

    static fetchAll(id_usuario){
        return db.execute('SELECT id_solicitud, info_adicional, fecha_hora, fecha_hora_sol, num_asistentes, s.status, m.nom_museo, m.imgP_museo, id_user_solicitud FROM Solicitud s, Museo m WHERE s.id_museo_solicitud = m.id_museo AND s.id_user_solicitud = ?', [id_usuario]);
    }

    static deleteOne(id_solicitud){
        db.execute('DELETE FROM Solicitud_Necesidad WHERE id_solicitud_necesidad = ?', [id_solicitud])
            .then(([rows, fieldData]) => {
                return db.execute('DELETE FROM Solicitud WHERE id_solicitud = ?', [id_solicitud])
            })
            .catch(err => console.log(err));
    }

    static correo_send(id_solicitud, necesidades, correo_museo){
        console.log("SI LLEGO CORREO SEND")
        const options= {
            from: "qultura_no_reply@outlook.com",
            to: correo_museo,
            subject: "Solicitud especial de recorrido",
            text: "Caracteristicas de solicitud \n  Fecha y hora: " + this.fecha_hora_sol + "\n Numero de asistentes: " + this.num_asistentes + "\n Requerimientos especiales: " + necesidades + "\n Otro: " + this.info_adicional + "\n Click aqui para confirmar solicitud : http://ec2-3-145-68-44.us-east-2.compute.amazonaws.com:8080/routes/solicitud_routes/aceptar/"+id_solicitud  + "\n Click aqui para denegar la solicitud : http://ec2-3-145-68-44.us-east-2.compute.amazonaws.com:8080/routes/negar/"+id_solicitud
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
        console.log("SI LLEGO ACEPTAR")
        return db.execute('UPDATE Solicitud SET status =? WHERE id_solicitud =?',[ 2 , id_solicitud])  
    }
    static negar_status(id_solicitud){
        console.log("SI LLEGO NEGAR")
        return db.execute('UPDATE Solicitud SET status =? WHERE id_solicitud =?',[ 3 , id_solicitud])  
    }

}