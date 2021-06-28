let productos = require('../databases/productos.json')

let carritoController = {
    index: function(req,res) {
        res.render('carritoCompras.ejs',{'productos':productos});
    },
}

module.exports = carritoController;