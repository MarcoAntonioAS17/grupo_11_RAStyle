const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname,"../databases/productos.json");
const productos = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
const db = require("../database/models");

const carritoController = {
    index: async function(req,res) {
        const productos = await db.Productos.findAll({
            include: [
                {association: "fotosDelProducto"}
            ],
            limit: 5
        });

        const tallas = await db.Talla.findAll();
        const colores = await db.Color.findAll();
        
        res.render('carritoCompras.ejs',{productos: productos, tallas: tallas, colores: colores});
    },
}

module.exports = carritoController;