const Sequelize = require('sequelize');

const sequelize = new Sequelize('presupuestos', null, null, {
  dialect: 'mssql',
  server: 'localhost',
  // port: 1433,
  dialectOptions: {
    authentication: {
      type: 'default',
      options: {
        encrypt: false, // for azure
        userName: 'sam',
        password: '1234',
        trustServerCertificate: true, // change to true for local dev / self-signed certs
        cryptoCredentialsDetails: {
          minVersion: 'TLSv1'
        }
      }
    },
  }
})

module.exports = sequelize;