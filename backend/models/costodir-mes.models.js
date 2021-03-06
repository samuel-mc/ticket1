const Sequelize = require('sequelize');
const db = require('../db/conexion');

/* Configuracion correspondiente al modelo de un ingreso . */
const CostoDirectoMes = db.define('costo_directo_mes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mes: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cantidad: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    id_costodirecto: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: 'costo_directos',  //Llave foranea que hace referencia a la tabla ingresos.
            key: 'id_costodirecto'
        }
    },
    
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
}) ;

/* Funcion que (si es necesario) crea la tabla usuarios */
// CostoDirectoMes.sync().then( () => {
//     console.log('Costo Directo Mes Creada');
// })

module.exports = { CostoDirectoMes };