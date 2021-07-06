const productos = require('../databases/productos.json')

const carritoController = {
    index: function(req,res) {
        res.render('carritoCompras.ejs',{productos});
    },
}

module.exports = carritoController;