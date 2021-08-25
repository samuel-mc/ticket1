const jwt = require('jsonwebtoken');

/* Valida que exista un token */
const validarToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        req.id = jwt.verify(token, 'secretkey').id_usuario; //VErifica que sea un token valido y asigna el id a una variable
        next();
    } catch (err) {
        res.status(401).json(err);
    }
}

module.exports = { validarToken }