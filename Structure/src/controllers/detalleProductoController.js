const productos = require('../databases/productos.json');



const detalleProductoController = {
    index: function(req,res) {
        const idProducto = parseInt(req.params.idProducto);
        let productoSelect = productos.find(producto=>producto.id===idProducto);

        res.render('detalleProducto.ejs',{"producto":productoSelect});
    },
    editar: (req, res) => {
        const idProducto = parseInt(req.params.idProducto);
        let productSelect = productos.find(producto => producto.id === idProducto);
        productSelect.talla.forEach(talla => console.log(talla));
        res.render('editarProductos.ejs', {"producto":productSelect});
    },
}

module.exports = detalleProductoController;