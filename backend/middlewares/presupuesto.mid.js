const { 
    altaPresupuestoDTO,
    altaIngresos,
    altaCostosDirectos,
    altaCostosAdm
} = require("../dto/presupuesto/alta.dto");

const Joi = require("joi");

/* Middlewares que verifica si los datos recibidos son correctos  */
const checkDatosPresupuesto = async (req, res, next) => {
    try {
        await Joi.attempt(req.body, altaPresupuestoDTO, "Los datos enviados no son correctos.");
        return next();
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

const checkDatosIngresos = async(req, res, next) => {
    try {
        await Joi.attempt(req.body, altaIngresos, "Los datos enviados no son correctos." );
        return next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const checkDatosCostosDirectos = async(req, res, next) => {
    try {
        await Joi.attempt(req.body, altaCostosDirectos, "Los datos enviados no son correctos." );
        return next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

const checkDatosCostosAdmn = async(req, res, next) => {
    try {
        await Joi.attempt(req.body, altaCostosAdm, "Los datos enviados no son correctos." );
        return next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

const checkDatosRecursos = async (req, res, next) => {
    try {
        await Joi.attempt(req.body, altaRecursos, "Los datos enviados no son correctos." );
        return next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    checkDatosPresupuesto,
    checkDatosIngresos,
    checkDatosCostosDirectos,
    checkDatosCostosAdmn,
    checkDatosRecursos
}