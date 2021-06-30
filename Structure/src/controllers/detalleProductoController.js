let detalleProductoController = {
    index: function(req,res) {
        res.render('detalleProducto.ejs');
    },
    editar: (req, res) => {
        res.render('editarProductos.ejs')
    },
}

module.exports = detalleProductoController;