const bcrypt = require('bcrypt');

/* Funcion que valida si el password es correcto */
const validarPassword = (usuario, password) => {
    const passwordDB = usuario.dataValues.password;
    const passwordCorecto = bcrypt.compareSync(password, passwordDB); // Desencripta el password
    return passwordCorecto; //Retorna un boolean si el password es correcto o no
}

/* Funcion que regresa el password cifrado*/
const cifrarPassword = async (password) => {
    const passHas = await bcrypt.hash(password, 10);
    return passHas;
}

module.exports = { validarPassword, cifrarPassword }