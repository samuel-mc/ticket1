const { Usuario, obtenerUsuarios, encontrarPorEmail} = require('../services/usuario.service')
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { cifrarPassword } = require('../auth/services/password.service')
const { crearJWT } = require('../services/crearJWT.service');

/* Controlador para crear un nuevo usuario  */
const crearUsuario = async (req, res) => {
    const id_usuario = uuidv4();
    const usuario = new Usuario(id_usuario);
    const { nombre, apellidos, email, password} = req.body;
    const passHas = await cifrarPassword(password); //Se usa el servicio encargado de cifrar el password
    try {
        await usuario.darDeAlta(nombre, apellidos, email, passHas); //Se usa el servicio encargado de guardar un nuevo usuario
        res.status(201).json({ 'message': 'Usuario creado con éxito.' });
    } catch (err) {
        res.status(400).json({ 'message': 'Problema al crear el usuario: ' + err.message });
    }
}

/* Controlador que muestra todos los usuarios en la bd */
const obtenerTodosLosUsuarios = async (req, res) => {
    try {
        const usuarios = await obtenerUsuarios();
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(400).json({ 'message': 'Problema al leer los usuario: ' + err.message });
    }
}

/* Controlador que muestra sólo un usuario */
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

/* Controlador para modificar la informacion de un usuario */
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

/* Controlador para dar de baja a un usuario */
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

/* Controlador que manda un email para recuperar contraseña */
const olvidoContrasena = async(req, res) => {
    const { email } = req.body;
    const usuario = await encontrarPorEmail(email);
    if (!usuario) {
        return res.status(400).json('Datos erroneos')
    }
    const token = await crearJWT(usuario.dataValues.id_usuario); //Se genera un token que servira para comprobar el cambio.
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'colten.goyette@ethereal.email',
                pass: 'bsknqakK66hHKab2cu'
            }
        });

        let mailOptions = {
            from: 'Presupuestos Chidos',
            to: email,
            subject: "🚨🚨 Cambiar password 🚨🚨",
            html: ` <p> Restablecer Password: 
                        <a> http://127.0.0.1:5501/frontend/cambiar-pass.html?token=${token} </a>
                    </p>`, // Se manda el link con el token correspondiente
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Email enviado');
            }
        })

        res.status(200).json("Tu nuevo password fue enviado a tu email");
    } catch (e) {
        res.status(400).json('No se pudo procesar tu solicitud');
        console.log(e);
    }
}

/* Controlador que modifica el password de un usuario */ 
const cambiarContraseña = async (req, res) => {
    const id_usuario = req.id;
    const { password } = req.body;
    const passHas = await bcrypt.hash(password, 10);
    const usuario = new Usuario(id_usuario);
      try {
            await usuario.cambiarContraseña(passHas);
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
    olvidoContrasena,

    cambiarContraseña
}