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
} = require('../controllers/presupuestos.controllers');

const {
    checkDatosPresupuesto,
    checkDatosIngresos,
    checkDatosCostosDirectos,
    checkDatosCostosAdmn
} = require('../middlewares/presupuesto.mid');

const { validarToken } = require('../auth/middlewares/token.midd');

/* CRUD usuarios */
app.post('/ingresos', validarToken, checkDatosIngresos, crearIngreso);
app.post('/costos-directos', validarToken, checkDatosCostosDirectos, crearCostoDirecto);
app.post('/costos-adm', validarToken, checkDatosCostosAdmn, crearCostoAdm);
app.post('/recursos', validarToken, crearRecurso);
app.post('/presupuesto', validarToken, checkDatosPresupuesto, crearPresupuesto);
app.get('/presupuesto', validarToken, obtenerPresupuestos);
app.delete('/presupuesto/:id', validarToken, eliminarPresupuestos);
// app.get('/ingresos/:id', obtenerIngresos);

module.exports = app;