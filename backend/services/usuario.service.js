const { usuarioModel } = require('../models/usuario.models');

class Usuario {
    constructor (id_usuario) {
        this.id_usuario = id_usuario;
    }

    darDeAlta (nombre, apellidos, email, password) {
        try {
            usuarioModel().create({
                id_usuario: this.id_usuario,
                nombre,
                apellidos,
                email,
                password
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    obtener () {        
        try {
            const usuario = usuarioModel().findOne({ where: { id_usuario: this.id_usuario } });
            return usuario;
        } catch (err) {
            throw new Error(err);
        }
    }

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

    darDeBaja () {
        usuarioModel().update({ eliminado: 1 }, { where: { id_usuario: this.id_usuario } });
    }

    cambiarContraseña (password) {
        try {
            usuarioModel().update({ password },{ where: { id_usuario: this.id_usuario } });
            console.log(this.id_usuario, ' cambiado');
        } catch (err) {
            throw new Error(err);
        }
    }
}

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

const encontrarPorEmail = (email) => {
    try {
        const usuario = usuarioModel().findOne({ where: { email } });
        return usuario;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = { Usuario, obtenerUsuarios, encontrarPorEmail }