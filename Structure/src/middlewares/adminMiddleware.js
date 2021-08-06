function adminMiddleware(req, res, next) {
    if (req.session.logeado != undefined && req.session.role == 'admin') {
        next();
    } else {
        // Agregar algún mensaje que diga que está logeado como administrador y la página no está disponible
        res.redirect('/users/logout');
        next();
    }
}

module.exports = adminMiddleware;