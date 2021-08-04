const { usuarioModel} = require('../models/usuario.models');
const bcrypt = require('bcrypt');


const crearUsuario = async (req, res) => {
    const { id_usuario, nombre, apellidos, email, username, password} = req.body;
    try {
        const passHas = await bcrypt.hash(password, 10);
        usuarioModel().create({
            id_usuario: id_usuario,
            nombre: nombre,
            apellidos: apellidos,
            email: email,
            username: username,
            password: passHas
        });
        res.status(201).json('Usuario creado con éxito.');
    } catch (err) {
        res.status(400).json('Problema al crear el usuario: ' + err.message);
    }
}

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioModel().findAll({});
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(400).json('Problema al leer los usuario: ' + err.message);
    }
}

const obtenerUnUsuarios = async (req, res) => {
    const id_usuario = req.params.id;
    try {
        const usuario = await usuarioModel().findOne({ where: id_usuario });
        res.status(200).json(usuario);
    } catch (err) {
        res.status(400).json('Problema al leer al usuario: ' + err.message);
    }
}

const actualizarUsuario = async (req, res) => {
    const { id_usuario } = req.params.id;
    const {  nombre, apellidos, email, username, password } = req.body;
    try {
        const passHas = await bcrypt.hash(password, 10);
        usuarioModel().update({
            nombre: nombre,
            apellidos: apellidos,
            email: email,
            username: username,
            password: passHas
        },
            { 
                where: { id_usuario } 
            }
        );
    } catch (err) {
        res.status(400).json('Problema al actualizar el usuario: ' + err.message);
    }
}

const eliminarUsuario = async (req, res) => {
    const { id_usuario } = req.params.id;
    try {
        const passHas = await bcrypt.hash(password, 10);
        usuarioModel().update({ eliminado: 0 }, { where: { id_usuario } });
    } catch (err) {
        res.status(400).json('Problema al eliminar el usuario: ' + err.message);
    }
}


module.exports = { 
    crearUsuario,
    obtenerUsuarios,
    obtenerUnUsuarios,
    actualizarUsuario,
    eliminarUsuario
}