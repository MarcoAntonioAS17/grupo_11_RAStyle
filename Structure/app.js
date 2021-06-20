const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

const publicPath= path.resolve(__dirname, './public');
app.use(express.static(publicPath));


app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto ',PORT);
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './view/home.html'));
})

app.get('/detalle_producto', (req, res) => {
    res.sendFile(path.resolve(__dirname, './view/detalle_producto.html'));
})

app.get('/registro', (req, res) => {
    res.sendFile(path.resolve(__dirname, './view/registro.html'));
})

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, './view/login.html'));
})

app.get('/carrito', (req, res) => {
    res.sendFile(path.resolve(__dirname, './view/CarritoDeCompra.html'));
})