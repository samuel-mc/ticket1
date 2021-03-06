const Joi = require('joi');

/* Valida los datos requeridos para dar de alta un nuevo usario */
module.exports.altaUsuarioDTO = Joi.object().keys({
    nombre: Joi.string().alphanum().min(3).max(50).required(),
    apellidos: Joi.string().alphanum().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(6).max(12).required()
})