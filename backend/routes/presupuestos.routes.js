const express = require('express');
const app = express();

const { 
    crearPresupuesto,
    obtenerPresupuestos,
    obtenerUnPresupuesto,
    actualizarPresupuesto,
    eliminarPresupuestos,

    crearIngreso,
    obtenerIngresos,
    actualizarIngresos,
    
    crearCostoDirecto,
    obtenerCostoDirecto,
    actualizarCostosDirectos,

    crearCostoAdm,
    obtenerCostoAdm,
    actualizarCostoAdm,
    
    crearRecurso,
    obtenerRecursos,
    actualizarRecursos
    
} = require('../controllers/presupuestos.controllers');

const {
    checkDatosPresupuesto,
    checkDatosIngresos,
    checkDatosCostosDirectos,
    checkDatosCostosAdmn
} = require('../middlewares/presupuesto.mid');

const { validarToken } = require('../auth/middlewares/token.midd');

/* CRUD presupuestos y los campos que se envian con el */
app.post('/presupuesto', validarToken, checkDatosPresupuesto, crearPresupuesto); //Crea un nuevo presupuesto
app.get('/presupuesto', validarToken, obtenerPresupuestos); //Obtiene un conjunto de presupuestos
app.get('/presupuesto/:id', validarToken, obtenerUnPresupuesto); // Obtiene un solo presupuesto
app.put('/presupuesto/:id', validarToken, actualizarPresupuesto); // Actualiza la informacion de presupuesto
app.delete('/presupuesto/:id', validarToken, eliminarPresupuestos); // Elimina cierto presupuesto. 

app.post('/ingresos', validarToken, checkDatosIngresos, crearIngreso); //Crea un nuevo ingresa
app.get('/ingresos/:id', obtenerIngresos); //Obtiene los ingresos segun el id del presupuesto
app.put('/ingresos/:id', actualizarIngresos);

app.post('/costos-directos', validarToken, checkDatosCostosDirectos, crearCostoDirecto); //Crea un nuevo costo directo.
app.get('/costos-directos/:id', validarToken, obtenerCostoDirecto); //Obtiene un conjunto de costos directos segun el id del presupuesto
app.put('/costos-directos/:id', validarToken, actualizarCostosDirectos);

app.post('/costos-adm', validarToken, checkDatosCostosAdmn, crearCostoAdm); //Crea un nuevo costo administrativo.
app.get('/costos-adm/:id', validarToken, obtenerCostoAdm);//Obtiene un conjunto de costos administrativos segun el id del presupuesto
app.put('/costos-adm/:id', validarToken, actualizarCostoAdm);

app.post('/recursos', validarToken, crearRecurso); //Crea un nuevo recurso
app.get('/recursos/:id', validarToken, obtenerRecursos); //Obtiene un conjunto te recursos.
app.put('/recursos/:id', actualizarRecursos); //
module.exports = app;