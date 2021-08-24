const express = require('express');
const app = express();

app.use(require('./users.routes'));
app.use(require('./presupuestos.routes'));

module.exports = app;