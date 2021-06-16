const express = require('express');
const path = require('path');

const app = express();

const publicPath= path.resolve(__dirname, './public');
app.use(express.static(publicPath));


app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './view/index.html'));
})

app.get('/detalle_producto', (req, res) => {
    res.sendFile(path.resolve(__dirname, './view/detalle_producto.html'));
})

app.get('/registro', (req, res) => {
    res.sendFile(path.resolve(__dirname, './view/registro.html'));
})