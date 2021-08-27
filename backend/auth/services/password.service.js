const bcrypt = require('bcrypt');

const validarPassword = (usuario, password) => {
    const passwordDB = usuario.dataValues.password;
    const passwordCorecto = bcrypt.compareSync(password, passwordDB);
    return passwordCorecto;
}

const cifrarPassword = async (password) => {
    const passHas = await bcrypt.hash(password, 10);
    return passHas;
}

module.exports = { validarPassword, cifrarPassword }