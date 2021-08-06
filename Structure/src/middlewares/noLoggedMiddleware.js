function noLoggedMiddleware(req, res, next) {
    if (req.session.logeado == undefined || (req.session.logeado != undefined && req.session.logeado == false)) {
        next();
    } else {
        // Agregar algún mensaje que diga que ya está logeado
        // Redirigir al perfil de usuario en lugar de al home
        res.redirect('/');
        next();
    }
}

module.exports = noLoggedMiddleware;