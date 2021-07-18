const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname,"../databases/productos.json");
const productos = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const carritoController = {
    index: function(req,res) {
        res.render('carritoCompras.ejs',{productos});
    },
}

module.exports = carritoController;