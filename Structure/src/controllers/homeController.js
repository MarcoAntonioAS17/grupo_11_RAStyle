let homeController = {
    index: function(req,res) {
        res.render('home.ejs');
    },
}

module.exports = homeController;