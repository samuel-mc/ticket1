const { Presupuesto } = require('../services/presupuesto.service')

const { v4: uuidv4 } = require('uuid');

/* Controlador que genera un nuevo presupuesto */
const crearPresupuesto = async (req, res) => {
    const { id_presupuesto_front, proyecto} = req.body;
    const id_usuario = req.id;
    const id_unico = id_presupuesto_front + 'mx-1609'; //Concatenamos el id recibido con una cadena para guardar un nuevo id
    const presupuesto = new Presupuesto(id_unico);
    try {
        await presupuesto.darDeAlta(id_usuario, id_presupuesto_front, proyecto); //Se usa el servicio encargado de guardar el presupuesto
        res.status(201).json({ 'message': 'Presupuesto agregado con exito.' });
    } catch (err) {
        res.status(400).json({ 'message': 'Problema al crear el Presupuesto: ' + err.message });
    }
}

/* Controlador que regresa los presupuestos en la base de datos */
const obtenerPresupuestos = async (req, res) => {
    try {
        presupuestos = await getPresupuestos();
        res.status(200).json(presupuestos[0]);
    } catch (err) {
        res.status(400).json('Problema al leer los presupuestos: ' + err.message);
    }
}

/* Crea un nuevo ingreso */
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

/* Crea un nuevo costo directo */
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

/* Crea un nuevo costo administrativo */
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

/* Crea un nuevo recurso */
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

/* Elimina un presupuesto */
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


module.exports = { 
    crearIngreso,
    crearCostoDirecto,
    crearCostoAdm,
    crearRecurso,
    crearPresupuesto,
    obtenerPresupuestos,
    eliminarPresupuestos

}