function userMiddleware(req, res, next) {
    if (req.session.logeado != undefined && req.session.role == 'user') {
        next();
    } else {
        // Agregar algún mensaje que diga que está logeado como usuario y la página no está disponible
        res.redirect('/users/logout');
        next();
    }
}

module.exports = userMiddleware;