const { encontrarPorEmail} = require('../../services/usuario.service');
const { crearJWT } = require('../../services/crearJWT.service');
const { validarPassword } = require('../services/password.service');


const loginUsuario = async (req, res) => {
    const password = req.body.password;
    try {
        const usuario = await encontrarPorEmail(req.body.email);
        if (!usuario) {
             res.status(400).json('Datos incorrectos.')
        }             
        if (!validarPassword(usuario, password)) {
            return res.status(400).json('Datos incorrectos.');
        }
        const token = await crearJWT(usuario.dataValues.id_usuario);
        return res.status(200).json(token);
    } catch (err) {
        console.log(err);
    }
}

module.exports = { loginUsuario };