const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./db/conexion');
require('dotenv').config();

/* Rutas utilizadas */
const usuariosRoutes = require('./routes/users')

/* Middlewares Globales */
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true}));
app.set('port', process.env.PORT ||4000);

/* Arranque del servidor. */
app.listen(process.env.PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('DB conectada correctamente');
        console.log('Server On Port', app.get('port'));
    } catch (error) {
        console.log('No se pudo iniciar. ');
    }
})

//Rutas
// app.use(require('./routes/index'))
usuariosRoutes(app);

app.get('/', (req, res) => {
    res.send('Fine');
})