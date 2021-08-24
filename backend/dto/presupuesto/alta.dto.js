const Joi = require('joi');

module.exports.altaPresupuestoDTO = Joi.object().keys({
    proyecto: Joi.string().min(3).max(50).required(),
    id_presupuesto_front: Joi.string().min(3).max(255).required()
})

module.exports.altaIngresos = Joi.object().keys({
    concepto: Joi.string().min(3).max(255).required(),
    ingresoPorMes: Joi.array().required(),
    id_presupuesto_front: Joi.string().min(3).max(255).required()
})

module.exports.altaCostosDirectos = Joi.object().keys({
    concepto: Joi.string().min(3).max(255).required(),
    mes: Joi.string().min(4).max(255).required(),
    cantidad: Joi.number().required(),
    id_presupuesto_front: Joi.string().min(3).max(255).required()
})

module.exports.altaCostosAdm = Joi.object().keys({
    concepto: Joi.string().min(3).max(255).required(),
    mes: Joi.string().min(4).max(255).required(),
    cantidad: Joi.number().required(),
    id_presupuesto_front: Joi.string().min(3).max(255).required()
})

module.exports.altaRecursos = Joi.object().keys({
    rol: Joi.string().min(3).max(255).required(),
    costo: Joi.number().required(),
    mes: Joi.string().min(4).max(20).required(),
    porcentaje: Joi.number().required(),
    id_presupuesto_front: Joi.string().min(5).max(255).required()
})