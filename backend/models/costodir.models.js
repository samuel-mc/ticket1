const Sequelize = require('sequelize');
const db = require('../db/conexion');

/* Configuracion correspondiente al modelo de un ingreso . */
const CostoDirecto = db.define('costo_directo', {
    id_costodirecto: {
        primaryKey: true,
        type: Sequelize.STRING,
        allowNull: false
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

// /* Funcion que (si es necesario) crea la tabla usuarios */
// CostoDirecto.sync().then( () => {
//     console.log('Costo Directo Creada');
// })

module.exports = { CostoDirecto };