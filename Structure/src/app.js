const express = require('express');
const path = require('path');

const app = express();

// REQUERIR ARCHIVOS DE RUTAS
const homeRoutes = require('./routes/homeRoutes.js');
const carritoRoutes = require('./routes/carritoRoutes.js');
const loginRoutes = require('./routes/loginRoutes.js');
const detalleProductoRoutes = require('./routes/detalleProductoRoutes.js');
const registroRoutes = require('./routes/registroRoutes.js');
//

const PORT = process.env.PORT || 3000;

const publicPath= path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

// Definir EJS como motor
app.set('view engine','ejs');

app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto ', PORT);
});

app.get('/', homeRoutes);

app.use('/detalle_producto', detalleProductoRoutes);

app.use('/registro', registroRoutes)

app.use('/login', loginRoutes)

app.use('/carrito', carritoRoutes)