const Sequelize = require('sequelize');
const db = require('../db/conexion');

/* Configuracion correspondiente al modelo de un ingreso . */
const MesIgreso = db.define('mes_ingreso', {
    id_ingreso: {
        type: Sequelize.STRING,
    },
    mes: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cantidad: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
}) ;

/* Funcion que (si es necesario) crea la tabla usuarios */
// MesIgreso.sync().then( () => {
//    console.log('MesIgreso Creada');
// })

module.exports = { MesIgreso };