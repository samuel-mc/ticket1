const Sequelize = require('sequelize');
const db = require('../db/conexion');

/* Configuracion correspondiente al modelo de un ingreso . */
const Recurso = db.define('recurso', {
    id_recurso: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rol: {
        type: Sequelize.STRING,
        allowNull: false
    },
    costo: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    mes: {
        type: Sequelize.STRING,
        allowNull: false
    },
    porcentaje: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    id_presupuesto: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: 'presupuestos',  //Llave foranea que hace referencia a la tabla presupuestos.
            key: 'id_presupuesto'
        }
    },
    
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
}) ;

/* Funcion que (si es necesario) crea la tabla usuarios */
// Recurso.sync().then( () => {
//     console.log('Recurso Creada');
// })

module.exports = { Recurso };