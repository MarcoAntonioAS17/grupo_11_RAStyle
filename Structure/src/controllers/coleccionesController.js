const productos = require('../databases/productos.json');

const coleccionesController = {
    listadoProductos: function (req, res) {
        res.render('listadoProductos.ejs',{'productos':productos});
    },
}

module.exports = coleccionesController;