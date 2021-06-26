let productos = require('../databases/productos.json')

let homeController = {
    index: function(req,res) {
        res.render('home.ejs',{'productos':productos});
    },
}


module.exports = homeController;