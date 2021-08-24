const { Usuario, obtenerUsuarios } = require('../services/usuario.service')

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const crearUsuario = async (req, res) => {
    const id_usuario = uuidv4();
    const usuario = new Usuario(id_usuario);
    const { nombre, apellidos, email, password} = req.body;
    const passHas = await bcrypt.hash(password, 10);
    try {
        await usuario.darDeAlta(nombre, apellidos, email, passHas);
        res.status(201).json({ 'message': 'Usuario creado con éxito.' });
    } catch (err) {
        res.status(400).json({ 'message': 'Problema al crear el usuario: ' + err.message });
    }
}

const obtenerTodosLosUsuarios = async (req, res) => {
    try {
        const usuarios = await obtenerUsuarios();
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(400).json({ 'message': 'Problema al leer los usuario: ' + err.message });
    }
}

const obtenerUnUsuario = async (req, res) => {
    const id_usuario = req.params.id;
    const usuario = new Usuario(id_usuario);;
    try {
        const usuarioObtenido = await usuario.obtener();
        res.status(200).json(usuarioObtenido);
    } catch (err) {
        res.status(400).json({ 'message': 'Problema al leer al usuario: ' + err.message });
    }
}

const actualizarUsuario = async (req, res) => {
    const id_usuario = req.params.id;
    const usuario = new Usuario(id_usuario);
    const {  nombre, apellidos, email } = req.body;
    try {
        await usuario.actualizar(nombre, apellidos, email)
        res.status(200).json({ 'message': 'Usuario actualizado con exito.' });
    } catch (err) {
        res.status(400).json({ 'message': 'Problema al actualizar el usuario: ' + err.message });
    }
}

const eliminarUsuario = async (req, res) => {
    const id_usuario = req.params.id;
    const usuario = new Usuario(id_usuario);
    try {
        await usuario.darDeBaja();
        res.status(200).json({ 'message': 'Usuario eliminado con exito' });
    } catch (err) {
        res.status(400).json({ 'message': 'Problema al eliminar el usuario: ' + err.message });
    }
}

const cambiarContraseña = async (req, res) => {
    const id_usuario = req.params.id;
    const { email, password } = req.body;
    const passHas = await bcrypt.hash(password, 10);
    const usuario = new Usuario(id_usuario);
      try {
            await usuario.cambiarContraseña(email, passHas)
            res.status(200).json({ 'message': 'Contraseña modificada con exito' });
      } catch (err) {
          res.status(400).json({ 'message': 'Contraseña no modificada' });
      }
}

module.exports = { 
    crearUsuario,
    obtenerTodosLosUsuarios,
    obtenerUnUsuario,
    actualizarUsuario,
    eliminarUsuario,

    cambiarContraseña
}