const express = require('express');
const app = express();

const {
    checkDatosAlta,
    checkUsuarioExistente,
    checkEmailExistente
} = require('../middlewares/usuarios.mid')

const { validarToken } = require('../auth/middlewares/token.midd');

const { 
    crearUsuario,
    obtenerTodosLosUsuarios,
    obtenerUnUsuario,
    actualizarUsuario,
    eliminarUsuario,
    olvidoContrasena,
    cambiarContraseña
} = require('../controllers/users.controllers');

const { loginUsuario } = require('../auth/login.controllers');

/* CRUD usuarios */
app.post('/usuarios', checkDatosAlta, checkEmailExistente, crearUsuario);
app.get('/usuarios', obtenerTodosLosUsuarios);
app.get('/usuarios/:id', checkUsuarioExistente, obtenerUnUsuario);
app.put('/usuarios/:id', checkUsuarioExistente, actualizarUsuario);
app.delete('/usuarios/:id', checkUsuarioExistente, eliminarUsuario);

app.post('/forgot-password', olvidoContrasena);
app.put('/cambiar-password', validarToken, cambiarContraseña)

/* Rutas login */
app.post('/login', loginUsuario);

module.exports = app;