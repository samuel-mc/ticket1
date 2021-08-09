const { Ingreso } = require('../models/ingreso.models');
const { MesIgreso } = require('../models/mes-ingreso.models');
const { CostoDirecto } = require('../models/costodir.models');
const { CostoAdm } = require('../models/costoadm.models');
const { Recurso } = require('../models/recurso.models');
const { Presupuesto, getPresupuestos } = require('../models/presupuesto.models');

const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')

const crearIngreso = async (req, res) => {
    const { concepto, ingresoPorMes, id_presupuesto } = req.body;
    const id_ingreso = uuidv4();
    const backid = id_presupuesto
    console.log(concepto, ingresoPorMes, id_presupuesto);
    try {
        await Ingreso.create({
            id_ingreso,
            concepto,
            id_presupuesto: backid
        });
        ingresoPorMes.map(async function(ingresoPorMes) {
            await MesIgreso.create({
                id_ingreso,
                mes: ingresoPorMes.mes,
                cantidad: ingresoPorMes.cantidad
            });  
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
            eliminado: 0,
            proyecto,
        });
        res.status(201).json('Presupuesto agregado con exito.');
    } catch (err) {
        res.status(400).json('Problema al crear el Presupuesto: ' + err.message);
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

const eliminarPresupuestos = async (req,res) => {
    try {
        const { id } = req.params;
        await Presupuesto.update({ eliminado: 0}, { where: { id_presupuestoBis: id } })
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