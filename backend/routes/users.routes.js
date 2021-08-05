const {
    checkDatosAlta,
    checkUsuarioExistente,
    checkEmailExistente,
    checkUsernameExistente
} = require('../middlewares/usuarios.mid')

const { 
    crearUsuario,
    obtenerUsuarios,
    obtenerUnUsuarios,
    actualizarUsuario,
    eliminarUsuario,

    loginUsuario
} = require('../controllers/users.controllers')

module.exports = (app) => { //Usando como referencia la clase 20
    /* CRUD usuarios */
    app.post('/usuarios', checkDatosAlta, checkEmailExistente, checkUsernameExistente, crearUsuario);
    app.get('/usuarios', obtenerUsuarios);
    app.get('/usuarios/:id', checkUsuarioExistente, obtenerUnUsuarios);
    app.put('/usuarios/:id', checkUsuarioExistente, checkEmailExistente, checkDatosAlta, checkUsernameExistente, actualizarUsuario);
    app.delete('/usuarios/:id', checkUsuarioExistente, eliminarUsuario);

    /* Rutas login */
    app.post('/login', loginUsuario)
}