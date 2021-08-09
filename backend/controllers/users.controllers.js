const { usuarioModel, getByEmailUsername} = require('../models/usuario.models');
const { crearJWT } = require('../services/crearJWT.service');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const crearUsuario = async (req, res) => {
    const { nombre, apellidos, email, username, password} = req.body;
    const id_usuario = uuidv4();
    try {
        const passHas = await bcrypt.hash(password, 10);
        usuarioModel().create({
            id_usuario,
            nombre,
            apellidos,
            email,
            username,
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
        const usuario = await usuarioModel().findOne({ where: { id_usuario } });
        res.status(200).json(usuario);
    } catch (err) {
        res.status(400).json('Problema al leer al usuario: ' + err.message);
    }
}

const actualizarUsuario = async (req, res) => {
    const id_usuario = req.params.id;
    console.log(id_usuario);
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
        res.status(200).json('Usuario actualizado con exito.');
    } catch (err) {
        res.status(400).json('Problema al actualizar el usuario: ' + err.message);
    }
}

const eliminarUsuario = async (req, res) => {
    const id_usuario = req.params.id;
    try {
        usuarioModel().update({ eliminado: 1 }, { where: { id_usuario } });
        res.send('Usuario eliminado con exito');
    } catch (err) {
        res.status(400).json('Problema al eliminar el usuario: ' + err.message);
    }
}

const loginUsuario = async (req, res) => {
    try {
        const usuario = await getByEmailUsername(req.body.email, req.body.username);
        if (!usuario) {
             res.status(400).json('Usuario no existente.')
        }             
        const passwordDB = usuario.dataValues.password;
        const passwordCorecto = bcrypt.compareSync(req.body.password, passwordDB);
        if (!passwordCorecto) {
            return res.status(400).json('Contraseña incorrecta.');
        }
        const token = await crearJWT(usuario.dataValues.id_usuario);
        return res.status(200).json(token);
    } catch (err) {
        console.log(err);
    }
}

const cambiarContraseña = async (req, res) => {
    const { email, password } = req.body
    const passHas = await bcrypt.hash(password, 10);
      try {
            await usuarioModel().update({ password: passHas },{ where: { email } });
            res.status(200).json('Contraseña modificada con exito')
      } catch (err) {
          res.status(400).json('Contraseña no modificada')
      }
}

module.exports = { 
    crearUsuario,
    obtenerUsuarios,
    obtenerUnUsuarios,
    actualizarUsuario,
    eliminarUsuario,

    loginUsuario,
    cambiarContraseña
}