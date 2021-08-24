const db = require('../db/conexion');
const Sequelize = require('sequelize');

/* Configuracion correspondiente al modelo de un usuario. */
usuarioModel = () => {
    return db.define('usuario', {
        id_usuario: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        apellidos: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tipo: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'user'
        },
        eliminado: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    }) 
}
/* Funcion que (si es necesario) crea la tabla usuarios */
const createTablaUsuarios = () => {
    usuarioModel().sync();
}

module.exports = { usuarioModel}