const Sequelize = require('sequelize');

const sequelize = new Sequelize('presupuestos', null, null, {
  dialect: 'mssql',
  server: 'process.env.DB_HOST',
  // port: 1433,
  dialectOptions: {
    authentication: {
      type: 'default',
      options: {
        encrypt: false, // for azure
        userName: process.env.DB_USR,
        password: process.env.DB_USR,
        trustServerCertificate: true, // change to true for local dev / self-signed certs
        cryptoCredentialsDetails: {
          minVersion: 'TLSv1'
        }
      }
    },
  }
})

module.exports = sequelize;