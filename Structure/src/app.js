const express = require('express');
const path = require('path');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// REQUERIR ARCHIVOS DE RUTAS
const homeRoutes = require('./routes/homeRoutes.js');
const carritoRoutes = require('./routes/carritoRoutes.js');
const loginRoutes = require('./routes/loginRoutes.js');
const detalleProductoRoutes = require('./routes/detalleProductoRoutes.js');
const registroRoutes = require('./routes/registroRoutes.js');
const coleccionesRoutes = require('./routes/coleccionesRoutes');
const methodOverride = require('method-override');
//

const PORT = process.env.PORT || 3000;

const publicPath= path.resolve(__dirname, '../public');
app.use(express.static(publicPath));
app.use(methodOverride('_method'));

// Definir EJS como motor
app.set('view engine','ejs');
app.set('views',path.join(__dirname, '/views'));

app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto ', PORT);
});

app.use('/', homeRoutes);

app.use('/products', detalleProductoRoutes);

app.use('/registro', registroRoutes);

app.use('/login', loginRoutes);

app.use('/carrito', carritoRoutes);

app.use('/coleccion', coleccionesRoutes);

//app.use('/busqueda', busquedaRoutes);

app.use((req,res)=>{
    res.status(404).render('error404.ejs');
})