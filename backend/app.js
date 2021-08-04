const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./db/conexion');
require('dotenv').config()

/* Rutas utilizadas */
const usuariosRoutes = require('./routes/users.routes')

/* Middlewares Globales */
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true}));

/* Arranque del servidor. */
app.listen(3030, async () => {
    try {
        await sequelize.authenticate();
        console.log('DB conectada correctamente');
        console.log('Server On Port: ' + 3030);
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