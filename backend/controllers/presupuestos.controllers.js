const { Ingreso } = require('../models/ingreso.models');
const { CostoDirecto } = require('../models/costodir.models');
const { CostoAdm } = require('../models/costoadm.models');
const { Recurso } = require('../models/recurso.models');
const { Presupuesto } = require('../models/presupuesto.models');

const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')

const crearIngreso = async (req, res) => {
    const { concepto, mes, cantidad, id_presupuesto } = req.body;
    console.log(concepto, mes, cantidad, id_presupuesto);

    try {
        await Ingreso.create({
            concepto,
            mes,
            cantidad,
            id_presupuesto
        });
        res.status(201).json('Ingreso agregado con éxito.');
    } catch (err) {
        res.status(400).json('Problema al crear el ingreso: ' + err.message);
    }
}

const crearCostoDirecto = async (req, res) => {
    const { concepto, mes, cantidad, id_presupuesto } = req.body;
    console.log(concepto, mes, cantidad, id_presupuesto);

    try {
        await CostoDirecto.create({
            concepto,
            mes,
            cantidad,
            id_presupuesto
        });
        res.status(201).json('Costo directo agregado con éxito.');
    } catch (err) {
        res.status(400).json('Problema al crear el costo directo: ' + err.message);
    }
}

const crearCostoAdm = async (req, res) => {
    const { concepto, mes, cantidad, id_presupuesto } = req.body;
    console.log(concepto, mes, cantidad, id_presupuesto);

    try {
        await CostoAdm.create({
            concepto,
            mes,
            cantidad,
            id_presupuesto
        });
        res.status(201).json('Costo administrativo agregado con éxito.');
    } catch (err) {
        res.status(400).json('Problema al crear el costo administrativo: ' + err.message);
    }
}

const crearRecurso = async (req, res) => {
    const {  rol, costo, mes, porcentaje, id_presupuesto} = req.body;
    console.log(rol, costo, mes, porcentaje, id_presupuesto);
    try {
        await Recurso.create({
            rol,
            costo,
            mes,
            porcentaje,
            id_presupuesto
        });
        res.status(201).json('Recurso agregado con exito.');
    } catch (err) {
        res.status(400).json('Problema al crear el recurso: ' + err.message);
    }
}

const crearPresupuesto = async (req, res) => {
    const { id_presupuesto, proyecto} = req.body;
    const id_unico = uuidv4();
    // const token2 = req.cookies.token;
    // const { uid } = jwt.verify(token2, 'secretkey')
    try {
        await Presupuesto.create({
            id_presupuesto: id_unico,
            id_presupuestoBis: id_presupuesto,
            id_usuario: 'e16a30c8-0998-450f-a7db-3cfb4d4e3311',
            proyecto,
        });
        res.status(201).json('Presupuesto agregado con exito.');
    } catch (err) {
        res.status(400).json('Problema al crear el Presupuesto: ' + err.message);
    }
}

const obtenerPresupuestos = async (req, res) => {
    try {
        presupuestos = await Presupuesto.findAll({ });
        res.status(200).json(presupuestos);
    } catch (err) {
        res.status(400).json('Problema al leer los presupuestos: ' + err.message);
    }
}

obtenerPresupuestos



module.exports = { 
    crearIngreso,
    crearCostoDirecto,
    crearCostoAdm,
    crearRecurso,
    crearPresupuesto,
    obtenerPresupuestos
}