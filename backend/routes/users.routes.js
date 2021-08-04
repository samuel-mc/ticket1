//Usando como referencia la clase 20

const {
    checkDatosAlta,
    checkUsuarioExistente,
    checkEmailExistente
} = require('../middlewares/usuarios.mid')

const { 
    crearUsuario,
    obtenerUsuarios,
    obtenerUnUsuarios,
    actualizarUsuario,
    eliminarUsuario
} = require('../controllers/users.controllers')

/* CRUD usuarios */
module.exports = (app) => {
    app.post('/usuarios', checkDatosAlta, checkEmailExistente, crearUsuario);
    app.get('/usuarios', obtenerUsuarios);
    app.get('/usuarios/:id', checkUsuarioExistente, obtenerUnUsuarios);
    app.put('/usuarios/:id', checkUsuarioExistente, checkEmailExistente, checkDatosAlta, actualizarUsuario);
    app.delete('/usuarios/:id', checkUsuarioExistente, eliminarUsuario);
}