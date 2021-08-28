const jwt = require('jsonwebtoken');

/* Middle que valida un token */
const validarToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; //Obtenemos el token desde los headers recibidos.
        req.id = jwt.verify(token, 'secretkey').id_usuario; //Verifica que sea un token valido y asigna el id a una variable
        next();
    } catch (err) {
        res.status(401).json(err);
    }
}

module.exports = { validarToken }