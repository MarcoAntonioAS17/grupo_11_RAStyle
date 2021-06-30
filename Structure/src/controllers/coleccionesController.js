let productos = require('../databases/productos.json');

let coleccionesController = {
    listadoProductos: function (req, res) {
        res.render('listadoProductos.ejs',{'productos':productos});
    },
}

module.exports = coleccionesController;