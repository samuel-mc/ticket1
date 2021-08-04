const { altaUsuarioDTO } = require("../dto/users/alta.dto")
const { usuarioModel } = require('../models/usuario.models');

module.exports.checkDatosAlta = async (req, res, next) => {
    try {
        await Joi.attempt(req.body, altaUsuarioDTO, "Los datos enviados no son correctos.");
        return next();
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

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