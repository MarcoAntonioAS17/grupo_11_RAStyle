const registroController = {
    index: function(req,res) {
        res.render('registro.ejs');
    },
    perfil: (req, res) => {
        res.render('registroUser');
    },
    perfilDomicilio: (req, res) => {
        res.render('registroDomicilioUser');
    },
}

module.exports = registroController;