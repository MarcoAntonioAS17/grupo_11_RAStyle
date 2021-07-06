const productos = require('../databases/productos.json')

const homeController = {
    index: function(req,res) {
        res.render('home.ejs',{'productos':productos});
    },
}


module.exports = homeController;