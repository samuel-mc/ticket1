const { 
    crearIngreso,
    crearCostoDirecto,
    crearCostoAdm,
    crearRecurso,
    crearPresupuesto,
    obtenerPresupuestos
} = require('../controllers/presupuestos.controllers')

module.exports = (app) => {
    /* CRUD usuarios */
    app.post('/ingresos', crearIngreso);
    app.post('/costos-directos', crearCostoDirecto);
    app.post('/costos-adm', crearCostoAdm);
    app.post('/recursos', crearRecurso);
    app.post('/presupuesto', crearPresupuesto);
    app.get('/presupuesto', obtenerPresupuestos);
  //  app.get('/usuarios', obtenerUsuarios);
  //  app.get('/usuarios/:id', checkUsuarioExistente, obtenerUnUsuarios);
  //  app.put('/usuarios/:id', checkUsuarioExistente, checkEmailExistente, checkDatosAlta, checkUsernameExistente, actualizarUsuario);
  //  app.delete('/usuarios/:id', checkUsuarioExistente, eliminarUsuario);

}