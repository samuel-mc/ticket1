const express = require('express');
const app = express();

const {
    checkDatosAlta,
    checkUsuarioExistente,
    checkEmailExistente
} = require('../middlewares/usuarios.mid')

const { 
    crearUsuario,
    obtenerTodosLosUsuarios,
    obtenerUnUsuario,
    actualizarUsuario,
    eliminarUsuario,
    cambiarContraseña
} = require('../controllers/users.controllers');

const { loginUsuario } = require('../auth/login.controllers');

/* CRUD usuarios */
app.post('/usuarios', checkDatosAlta, checkEmailExistente, crearUsuario);
app.get('/usuarios', obtenerTodosLosUsuarios);
app.get('/usuarios/:id', checkUsuarioExistente, obtenerUnUsuario);
app.put('/usuarios/:id', checkUsuarioExistente, actualizarUsuario);
app.delete('/usuarios/:id', checkUsuarioExistente, eliminarUsuario);
app.put('/password', cambiarContraseña)

/* Rutas login */
app.post('/login', loginUsuario);

module.exports = app;