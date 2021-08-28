const Sequelize = require('sequelize');
const db = require('../db/conexion');

/* Configuracion correspondiente al modelo de un ingreso . */
const ingresoModel = db.define('ingreso', {
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
        allowNull: false,
        references: {
            model: 'presupuestos', //Llave foranea que hace referencia a la tabla presupuestos.
            key: 'id_presupuesto'
        }
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE

}) ;

/* Funcion que (si es necesario) crea la tabla usuarios */
// ingresoModel.sync().then( () => {
//     console.log('Ingreso Creada');
// })

module.exports = { ingresoModel };