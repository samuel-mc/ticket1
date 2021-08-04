//Usando como referencia la clase 20
const { 
    crearUsuario,
    obtenerUsuarios,
    obtenerUnUsuarios,
    actualizarUsuario,
    eliminarUsuario
} = require('../controllers/users.controllers')

/* CRUD usuarios */
module.exports = (app) => {
    app.post('/usuarios', crearUsuario);
    app.get('/usuarios', obtenerUsuarios);
    app.get('/usuarios/:id', obtenerUnUsuarios);
    app.put('/usuarios/:id', actualizarUsuario);
    app.delete('/usuarios/:id', eliminarUsuario);
}