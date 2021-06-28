let productos = require('../databases/productos.json');

let detalleProductoController = {
    index: function(req,res) {
        let idProducto = parseInt(req.params.idProducto);
        let productoSelect = productos.find(producto=>producto.id===idProducto);

        res.render('detalleProducto.ejs',{"producto":productoSelect});
    },
}

module.exports = detalleProductoController;