const { usuarioModel } = require('../models/usuario.models');

/* Clase para trabajar con un usuario */
class Usuario {
    constructor (id_usuario) {
        this.id_usuario = id_usuario;
    }

    /* Metodo para guardar el usuario en la base de datos */
    darDeAlta (nombre, apellidos, email, password) {
        try {
            usuarioModel().create({
                id_usuario: this.id_usuario, //Usamos el id dado al instanciar la clase
                nombre,
                apellidos,
                email,
                password
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    /* Metodo para obtener un usuario de la base de datos */
    obtener () {        
        try {
            const usuario = usuarioModel().findOne({ where: { id_usuario: this.id_usuario } });
            return usuario;
        } catch (err) {
            throw new Error(err);
        }
    }

     /* Metodo para actualizar la informacion de un usuario */   
    actualizar (nombre, apellidos, email) {
        try {
            usuarioModel().update({
                nombre: nombre,
                apellidos: apellidos,
                email: email,
            },
                { 
                    where: { id_usuario: this.id_usuario} 
                }
            );
        } catch (err) {
            throw new Error(err);
        }
    }

    /* Metodo para borrar de manera logica a cierto usuario */
    darDeBaja () {
        usuarioModel().update({ eliminado: 1 }, { where: { id_usuario: this.id_usuario } });
    }

    /* Metodo para actualizar la contraseña de un usuario */
    cambiarContraseña (password) {
        try {
            usuarioModel().update({ password },{ where: { id_usuario: this.id_usuario } });
        } catch (err) {
            throw new Error(err);
        }
    }
}

/* Regresa un conjunto de usuarios */
const obtenerUsuarios = () => {
    try {
        const usuarios = usuarioModel().findAll({
            attributes: {
                exclude: ['password']
            }
        });
        return usuarios;
    } catch (err) {
        throw new Error(err);
    }
}

/* Busca un usuario de acuerdo a un email */
const encontrarPorEmail = (email) => {
    try {
        const usuario = usuarioModel().findOne({ where: { email } });
        return usuario;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = { Usuario, obtenerUsuarios, encontrarPorEmail }