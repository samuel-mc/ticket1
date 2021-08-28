const { encontrarPorEmail} = require('../../services/usuario.service');
const { crearJWT } = require('../../services/crearJWT.service');
const { validarPassword } = require('../services/password.service');

/* Controlador para loggear a un usuario*/
const loginUsuario = async (req, res) => {
    const password = req.body.password;
    try {
        const usuario = await encontrarPorEmail(req.body.email); //usamor el servicio que encuentra a un usuario por email
        if (!usuario) {
             res.status(400).json('Datos incorrectos.') // Si el usuario no se encontro mandamos un error.
        }             
        if (!validarPassword(usuario, password)) { //Usamo el servicio correspondiente para validar el password.
            return res.status(400).json('Datos incorrectos.'); //Si la contraseña no coincide, mandamos error
        }
        const token = await crearJWT(usuario.dataValues.id_usuario); 
        return res.status(200).json(token); //Si todo es correcto, se manda el token generado.
    } catch (err) {
        console.log(err);
    }
}

module.exports = { loginUsuario };