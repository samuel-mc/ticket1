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

/* CRUD presupuestos */
app.post('/presupuesto', validarToken, checkDatosPresupuesto, crearPresupuesto);
app.get('/presupuesto', obtenerPresupuestos);
app.post('/ingresos', validarToken, checkDatosIngresos, crearIngreso);
app.post('/costos-directos', validarToken, checkDatosCostosDirectos, crearCostoDirecto);
app.post('/costos-adm', validarToken, checkDatosCostosAdmn, crearCostoAdm);
app.post('/recursos', validarToken, crearRecurso);
app.delete('/presupuesto/:id', validarToken, eliminarPresupuestos);

module.exports = app;