const { encontrarPorEmail} = require('../services/usuario.service');
const { crearJWT } = require('../services/crearJWT.service');
const bcrypt = require('bcrypt');

const loginUsuario = async (req, res) => {
    console.log('Login');
    try {
        const usuario = await encontrarPorEmail(req.body.email);
        if (!usuario) {
             res.status(400).json('Datos incorrectos.')
        }             
        const passwordDB = usuario.dataValues.password;
        const passwordCorecto = bcrypt.compareSync(req.body.password, passwordDB);
        if (!passwordCorecto) {
            return res.status(400).json('Datos incorrectos.');
        }
        const token = await crearJWT(usuario.dataValues.id_usuario);
        return res.status(200).json(token);
    } catch (err) {
        console.log(err);
    }
}

module.exports = { loginUsuario };