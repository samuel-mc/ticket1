//Usando como referencia la clase 20

module.exports = (app) => {
    app.get('/login', (req, res) => {
        res.send('login');
    })
}