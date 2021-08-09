const Sequelize = require('sequelize');
const db = require('../db/conexion');

/* Configuracion correspondiente al modelo de un ingreso . */
const Presupuesto = db.define('presupuesto', {
    id_presupuesto: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    id_presupuestoBis: { // id para el fron
        type: Sequelize.STRING,
        allowNull: false
    },
    id_usuario: {
        type: Sequelize.STRING,
        allowNull: false
    },
    proyecto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    version: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    eliminado: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
}) ;

/* Funcion que (si es necesario) crea la tabla usuarios */
// Presupuesto.sync().then( () => {
//     console.log('Presupuesto Creada');
// })

const getPresupuestos = () => {
    const presupuesto = db.query('SELECT * FROM presupuestos WHERE eliminado <> 1');
    return presupuesto;
}

module.exports = { Presupuesto, getPresupuestos };