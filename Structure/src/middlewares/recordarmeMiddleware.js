function recordarmeMiddleware (req, res, next) {
    if(req.cookies.logeado != undefined && req.session.logeado == undefined) {
        const pathUser = '../databases/usuarios.json';
        const usuarios = require(pathUser);
        for (let user of usuarios) {
            if (user.email == req.cookies.user) {
                req.session.userEmail = user.email;
                req.session.userNombre = user.firstName;
                req.session.logeado = true;
                req.session.role = user.category;
            }
        }
    }

    next();
}

module.exports = recordarmeMiddleware;