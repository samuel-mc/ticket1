require('dotenv').config();

/* Configuarcion para permitir el consumo de la api */
const corsOption = {
    origin: function (origin, callback) {
        if (process.env.LISTA_BLANCA.indexOf(origin) !== -1){
            callback(null, true);
        } else {
            callback(new Error('No autorizado por CORS'))
        }
    }
}


module.exports = { corsOption }