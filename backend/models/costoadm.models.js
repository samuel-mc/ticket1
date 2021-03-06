const Sequelize = require('sequelize');
const db = require('../db/conexion');

/* Configuracion correspondiente al modelo de un ingreso . */
const CostoAdm = db.define('gasto_administrativo', {
    id_costoadm: {
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
        references: { //Llave foranea que hace referencia a la tabla presupuestos.
            model: 'presupuestos',
            key: 'id_presupuesto'
        }
    },    
    
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
}) ;

/* Funcion que (si es necesario) crea la tabla usuarios */
// CostoAdm.sync().then( () => {
//     console.log('Costo Adm Creada');
// })


module.exports = { CostoAdm };