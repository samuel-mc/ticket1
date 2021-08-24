const Sequelize = require('sequelize');
const db = require('../db/conexion');

/* Configuracion correspondiente al modelo de un ingreso . */
const presupuestoModel = db.define('presupuesto', {
    id_presupuesto: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    id_presupuesto_front: { // id para el fron
        type: Sequelize.STRING,
        allowNull: false
    },
    id_usuario: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            key: 'id_usuario'
        }
    },
    proyecto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    version: {
        type: Sequelize.INTEGER,
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
// presupuestoModel.sync().then( () => {
//     console.log('Presupuesto Creada');
// })

module.exports = { presupuestoModel };