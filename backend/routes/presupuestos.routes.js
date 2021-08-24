const express = require('express');
const app = express();

const { 
    crearIngreso,
    crearCostoDirecto,
    crearCostoAdm,
    crearRecurso,
    crearPresupuesto,
    obtenerPresupuestos,
    eliminarPresupuestos,
    obtenerIngresos
} = require('../controllers/presupuestos.controllers');

const {
    checkDatosPresupuesto,
    checkDatosIngresos,
    checkDatosCostosDirectos,
    checkDatosCostosAdmn
} = require('../middlewares/presupuesto.mid')

/* CRUD usuarios */
app.post('/ingresos', checkDatosIngresos, crearIngreso);
app.post('/costos-directos', checkDatosCostosDirectos, crearCostoDirecto);
app.post('/costos-adm', checkDatosCostosAdmn, crearCostoAdm);
app.post('/recursos', crearRecurso);
app.post('/presupuesto', checkDatosPresupuesto, crearPresupuesto);
app.get('/presupuesto', obtenerPresupuestos);
app.delete('/presupuesto/:id', eliminarPresupuestos);
app.get('/ingresos/:id', obtenerIngresos);

module.exports = app;