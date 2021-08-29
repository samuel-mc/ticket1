const Joi = require('joi');

/* Valida los datos requeridos para dar de alta un presupuesto */
module.exports.altaPresupuestoDTO = Joi.object().keys({
    proyecto: Joi.string().min(3).max(50).required(),
    id_presupuesto_front: Joi.string().min(3).max(255).required()
})

/* Valida los datos requeridos para dar de alta un ingreso */
module.exports.altaIngresos = Joi.object().keys({
    concepto: Joi.string().min(3).max(255).required(),
    ingresoPorMes: Joi.array().required(),
    id_presupuesto_front: Joi.string().min(3).max(255).required()
})

/* Valida los datos requeridos para dar de alta un costo directo */
module.exports.altaCostosDirectos = Joi.object().keys({
    concepto: Joi.string().min(3).max(255).required(),
    costosDirPorMes: Joi.array().required(),
    id_presupuesto_front: Joi.string().min(3).max(255).required()
})

/* Valida los datos requeridos para dar de alta un costo administrativo */
module.exports.altaCostosAdm = Joi.object().keys({
    concepto: Joi.string().min(3).max(255).required(),
    costosAdmPorMes: Joi.array().required(),
    id_presupuesto_front: Joi.string().min(3).max(255).required()
})

/* Valida los datos requeridos para dar de alta un recurso */
module.exports.altaRecursos = Joi.object().keys({
    rol: Joi.string().min(3).max(255).required(),
    costo: Joi.number().required(),
    mes: Joi.string().min(4).max(20).required(),
    porcentaje: Joi.number().required(),
    id_presupuesto_front: Joi.string().min(5).max(255).required()
})