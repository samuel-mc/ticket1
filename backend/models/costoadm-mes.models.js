const Sequelize = require('sequelize');
const db = require('../db/conexion');

/* Configuracion correspondiente al modelo de un ingreso . */
const CostoAdmMes = db.define('gasto_administrativo_mes', {
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
    id_costoadm: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: 'gasto_administrativos',  //Llave foranea que hace referencia a la tabla ingresos.
            key: 'id_costoadm'
        }
    },  
    
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
}) ;

/* Funcion que (si es necesario) crea la tabla usuarios */
// CostoAdmMes.sync().then( () => {
//     console.log('Costo Adm Mes Creada');
// })

module.exports = { CostoAdmMes };