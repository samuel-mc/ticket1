const Sequelize = require('sequelize');
const db = require('../db/conexion');

/* Configuracion correspondiente al modelo de un ingreso . */
const Ingreso = db.define('ingreso', {
    id_ingreso: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    concepto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    id_presupuesto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE

}) ;

/* Funcion que (si es necesario) crea la tabla usuarios */
// Ingreso.sync().then( () => {
//     console.log('Ingreso Creada');
// })

module.exports = { Ingreso };