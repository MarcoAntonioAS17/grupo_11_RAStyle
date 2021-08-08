function loggedMiddleware(req, res, next) {
    if (req.session.logeado != undefined && req.session.logeado == true) {
        next();
    } else {
        // Agregar algún mensaje que diga que ya está logeado
        // Redirigir al perfil de usuario en lugar de al home
        res.redirect('/users/login');
        next();
    }
}

module.exports = loggedMiddleware;