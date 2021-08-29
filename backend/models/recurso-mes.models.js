const Sequelize = require('sequelize');
const db = require('../db/conexion');

/* Configuracion correspondiente al modelo de un ingreso . */
const RecursoMes = db.define('recurso_mes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mes: {
        type: Sequelize.STRING,
        allowNull: false
    },
    porcentaje: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    id_recurso: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: 'recursos',  //Llave foranea que hace referencia a la tabla presupuestos.
            key: 'id_recurso'
        }
    },
    
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
}) ;

/* Funcion que (si es necesario) crea la tabla usuarios */
// RecursoMes.sync().then( () => {
//     console.log('RecursoMes Creada');
// })

module.exports = { RecursoMes };