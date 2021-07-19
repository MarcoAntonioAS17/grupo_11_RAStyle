const productos = require('../databases/productos.json');

const detalleProductoController = {
    index: function(req,res) {
        const idProducto = req.params.idProducto;
        let productoSelect = productos.find(producto=>producto.id===idProducto);
        res.render('detalleProducto.ejs',{"producto":productoSelect});
    },
    editar: (req, res) => {
        res.render('editarProductos.ejs')
    },
}

module.exports = detalleProductoController;