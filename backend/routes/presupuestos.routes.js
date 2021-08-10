const { 
    crearIngreso,
    crearCostoDirecto,
    crearCostoAdm,
    crearRecurso,
    crearPresupuesto,
    obtenerPresupuestos,
    eliminarPresupuestos,
    obtenerIngresos
} = require('../controllers/presupuestos.controllers')

module.exports = (app) => {
    /* CRUD usuarios */
    app.post('/ingresos', crearIngreso);
    app.post('/costos-directos', crearCostoDirecto);
    app.post('/costos-adm', crearCostoAdm);
    app.post('/recursos', crearRecurso);
    app.post('/presupuesto', crearPresupuesto);
    app.get('/presupuesto', obtenerPresupuestos);
    app.delete('/presupuesto/:id', eliminarPresupuestos);
    app.get('/ingresos/:id', obtenerIngresos);
}