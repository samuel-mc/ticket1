const { Presupuesto, getPresupuestos } = require('../services/presupuesto.service')

const { Ingreso } = require('../models/ingreso.models');
const { Recurso } = require('../models/recurso.models');
// const { Presupuesto, getPresupuestos } = require('../models/presupuesto.models');

const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')

const crearPresupuesto = async (req, res) => {
    const { id_presupuesto_front, proyecto} = req.body;
    const id_unico = id_presupuesto_front + 'mx-1609';
    const presupuesto = new Presupuesto(id_unico);
    try {
        await presupuesto.darDeAlta('6d5b00a9-97c6-4601-aee5-8035ac0aac5e', id_presupuesto_front, proyecto);
        res.status(201).json({ 'message': 'Presupuesto agregado con exito.' });
    } catch (err) {
        res.status(400).json({ 'message': 'Problema al crear el Presupuesto: ' + err.message });
    }
}

const obtenerPresupuestos = async (req, res) => {
    try {
        presupuestos = await getPresupuestos();
        res.status(200).json(presupuestos[0]);
    } catch (err) {
        res.status(400).json('Problema al leer los presupuestos: ' + err.message);
    }
}

const crearIngreso = async (req, res) => {
    const { concepto, ingresoPorMes, id_presupuesto_front } = req.body;
    const id_presupuesto = id_presupuesto_front + 'mx-1609';
    const id_ingreso = uuidv4();
    const presupuesto = new Presupuesto(id_presupuesto);
    try {
        await presupuesto.agregarIngresos(id_ingreso, concepto, ingresoPorMes);
        res.status(201).json('Ingreso agregado con éxito.');
    } catch (err) {
        res.status(400).json('Problema al crear el ingreso: ' + err.message);
    }
}

const crearCostoDirecto = async (req, res) => {
    const { concepto, mes, cantidad, id_presupuesto_front } = req.body;
    const id_presupuesto = id_presupuesto_front + 'mx-1609';
    const presupuesto = new Presupuesto(id_presupuesto);
    try {
        await presupuesto.agregarCostosDirectos(concepto, mes, cantidad);
        res.status(201).json('Costo directo agregado con éxito.');
    } catch (err) {
        res.status(400).json('Problema al crear el costo directo: ' + err.message);
    }
}

const crearCostoAdm = async (req, res) => {
    const { concepto, mes, cantidad, id_presupuesto_front } = req.body;
    const id_presupuesto = id_presupuesto_front + 'mx-1609';
    const presupuesto = new Presupuesto(id_presupuesto);
    try {
        await presupuesto.agregarCostosAdmin(concepto, mes, cantidad);
        res.status(201).json('Costo directo agregado con éxito.');
    } catch (err) {
        res.status(400).json('Problema al crear el costo directo: ' + err.message);
    }
}

const crearRecurso = async (req, res) => {
    const {  rol, costo, mes, porcentaje, id_presupuesto_front} = req.body;
    const id_presupuesto = id_presupuesto_front + 'mx-1609';
    const presupuesto = new Presupuesto(id_presupuesto);
    try {
        await presupuesto.agregarRecurso(rol, costo, mes, porcentaje);
        res.status(201).json('Recurso agregado con exito.');
    } catch (err) {
        res.status(400).json('Problema al crear el recurso: ' + err.message);
    }
}

const eliminarPresupuestos = async (req,res) => {
    const id_presupuesto = req.params.id + 'mx-1609';
    try {
        const presupuesto = new Presupuesto(id_presupuesto);
        presupuesto.darDeBaja();
        res.status(200).json('Presupuesto eliminado con exito.');
    } catch (err) {
        res.status(400).json('Problema al eliminar el presupuestos: ' + err.message);
    }
}

const obtenerIngresos = async (req, res) => {
    try {
        const { id } = req.params;
        const ingresos = await Ingreso.findAll({ where: { id_presupuesto: id } })
        console.log(ingresos);
        res.status(200).json(ingresos);
    } catch (err) {
        res.status(400).json('Problema al leer los costos: ' + err.message);
    }        
}



module.exports = { 
    crearIngreso,
    crearCostoDirecto,
    crearCostoAdm,
    crearRecurso,
    crearPresupuesto,
    obtenerPresupuestos,
    eliminarPresupuestos,
    obtenerIngresos

}