const { altaUsuarioDTO } = require("../dto/users/alta.dto");
const { usuarioModel } = require('../models/usuario.models');
const Joi = require("joi");

/* Middlewares que verifica si los datos recibidos son correctos  */
module.exports.checkDatosAlta = async (req, res, next) => {
    try {
        await Joi.attempt(req.body, altaUsuarioDTO, "Los datos enviados no son correctos.");
        return next();
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

/* Middleware que verifica si un usuario existe en la base de datos */
module.exports.checkUsuarioExistente = async (req, res, next) => {
    try {
        const usuario = await usuarioModel().findOne({ where:{ id_usuario: req.params.id } });
        if (!usuario) {
            res.status(404).json('El usuario no existe.');
        } else {
            return next();
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

/* Middleware que verifica si un email ya esta registrado en la base de datos */
module.exports.checkEmailExistente = async (req, res, next) => {
    try {
        const usuario = await usuarioModel().findOne({ where: { email: req.body.email}})
        if (!usuario) {
            return next();
        } else {
            res.status(400).json('El email ya esta registrado.');
        }
    } catch (err) {
        throw new Error(err.message);
    }
}