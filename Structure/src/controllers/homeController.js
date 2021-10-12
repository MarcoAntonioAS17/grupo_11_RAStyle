const fs = require('fs');
//const path = require('path');

//const productsFilePath = path.join(__dirname,"../databases/productos.json");
//const productos = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

// USO DE SEQUELIZE
const db = require("../database/models");
// %%%%%%%%%%%%%%%%

const homeController = {
    index: async function(req,res) {
        //res.render('home.ejs',{'productos':productos});
        const products = await db.Productos.findAll({
            limit: 5,
            include: [{association: "fotosDelProducto"}]
        })
        //console.log(products)
        res.render('home.ejs',{'productos':products});
    },
}


module.exports = homeController;