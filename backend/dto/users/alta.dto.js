const Joi = require('joi');

module.exports.altaUsuarioDTO = Joi.object().keys({
    nombre: Joi.string().alphanum().min(6).max(50),
    apellidos: Joi.string().alphanum().min(6).max(50).required(),
    email: Joi.string().email(),
    username: Joi.string().alphanum().min(6).max(10).required(),
    password: Joi.string().alphanum().min(8).max(12).required()
})