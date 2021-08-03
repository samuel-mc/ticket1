const db = require('../db/conexion');
const Sequelize = require('sequelize');

class Usuario {
    
    /* Configuracion correspondiente al modelo de un usuario. */
    setupUsuarioModel = () => {
        return db.define('Usuario', {
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
            username: {
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
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE
        }) 
    }
}

/* Funcion que (si es necesario) crea la tabla usuarios */
const createTablaUsuarios = () => {
    new Usuario().setupUsuarioModel().sync();
}

createTablaUsuarios();
