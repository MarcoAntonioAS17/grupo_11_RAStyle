const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

// USO DE SEQUELIZE
const db = require("../database/models");
// %%%%%%%%%%%%%%%%

const usersController = {
    index: function(req,res) {
        console.log("Mostrando->vista->login");
        res.render('login.ejs');
    },
    registroUsuario: function(req,res) {
        console.log("Mostrando->vista->registro");
        res.render('registro.ejs');
    },  
    registrarUsuario: async function(req, res, next) {
        const errors = validationResult(req);
        console.log("Registrando->Nuevo usuario");
        if (!errors.isEmpty()) {
            let strc = crearObjeto(req.body);
            return res.render('registro', {errors: errors.mapped(), usuario: strc});
        }
        const resultsUsers = await db.Usuarios.findAll({where: {email: req.body.correo}});
        if (resultsUsers) {
            const result = {
                correo: {
                    msg: "Este correo ya está registrado, intenta con otro."
                }
            }
            return res.render('registro', {errors: result, usuario: crearObjeto(req.body)});
        }  
        let newUser = req.body;
        newUser.password = bcrypt.hashSync(newUser.password, 12).toString();
        
        newUser = crearObjeto(newUser);
        await db.Usuarios.create(newUser);
        console.log("GUARDADO...");
        req.session.userNombre = newUser.firstName;
        req.session.userEmail = newUser.email;
        req.session.logeado = true;
        req.session.role = 'user';
        
        return res.redirect('/users/info');
        
    },
    iniciarSesion: async function(req,res) {
        console.log("->Iniciando sesion");
        let errores = validationResult(req);
        if (!errores.isEmpty()) {
            const strc = crearObjeto(req.body);
            return res.render('login.ejs', {errors: errores.mapped(), usuario: strc})
        }

        const currentUser = req.body;
        
        const user = await db.Usuarios.findOne({
            where: { email: req.body.correo}
        });

        if (!user) {
            return res.render('login.ejs', { errors: {
                correo: { msg: "Usuario no encontrado" }
            }})
        }

        if (bcrypt.compareSync(currentUser.password, user.dataValues.password)) {
            // Guardar datos de sesión
            req.session.userEmail = user.dataValues.email;
            req.session.userNombre = user.dataValues.firstName;
            req.session.logeado = true;
            req.session.role = user.dataValues.category == 2? "user": "admin";
            if (currentUser.recordarme != undefined) {
                res.cookie('user',currentUser.correo, {maxAge: 1800000});
                res.cookie('logeado',true, {maxAge: 1800000});
            }
            return res.redirect('/users/info');
        } else {
            return res.render('login.ejs', {errors:  {
                password: { msg: "Contraseña incorrecta" }
            }});
        }
    },
    logout: function(req, res) {
        console.log("->Saliendo");
        req.session.userEmail = null;
        req.session.userNombre = null;
        req.session.logeado = false;
        req.session.role = null;
        res.clearCookie('user');
        res.clearCookie('logeado');
        res.redirect('/users/login');
    },
    perfil: async function (req, res) {     
        console.log("Mostrando->vista->perfil");
        const session = req.session;
        let  usuario = await db.Usuarios.findOne({
            where: { email: session.userEmail }
        });
        usuario = crearObjeto(usuario.dataValues); 
        return res.render('registroUser', {usuario})
        //Validar que pasa si por alguna razón el usuario no existe 
    },
    actualizarPerfil: async function (req, res) {
        console.log("Actualizando->Info->Perfil");
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            const strc = crearObjeto(req.body);
            return res.render('registroUser', {errors: errors.mapped(), usuario: strc});
        }
        const usuario = await db.Usuarios.findByPk(req.params.id);
        //Validar si no lo encuentra

        const OldData = usuario.dataValues;
        if (!bcrypt.compareSync(req.body.password, OldData.password)) {
            return enviarErrorPassword(req.body, res);
        }
        const file = req.file;
        if (file) {
            OldData.image = '/images/profilePictures/'+file.filename;
        }
        const dataUpdated = req.body;
        dataUpdated.password = bcrypt.hashSync(dataUpdated.password, 12);
        await db.Usuarios.update(
            {...OldData, ...dataUpdated },
            { where: { id:req.params.id} });

        req.session.userNombre = dataUpdated.firstName;
        req.session.userEmail = dataUpdated.email;
        
        return res.redirect('/users/info');
        //Validar que si actualiza
    },
    perfilDomicilio: async function(req, res) {
        console.log("Mostrando->Info->Domicilio");
        const session = req.session;

        const user = await db.Usuarios.findOne({
            where: { email: session.userEmail}
        });
        //validar usuario no encontrado
        const usuario = crearObjeto(user.dataValues);
        res.render('registroDomicilioUser', {usuario});
    },
    actualizarPerfilDomicilio: async function(req, res) {
        console.log("Actualizar->Info->Domicilio");
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.mapped());
            const strc = crearObjeto(req.body);
            return res.render('registroDomicilioUser', {errors: errors.mapped(), usuario: strc});
        }
        await db.Usuarios.update(
            {...req.body},
            {where: { email: req.session.userEmail}}
            );
        return res.redirect('/users/info/domicilio');
    }
}

function crearObjeto(body) {
    let strc = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        id_CategoriaUsuario: 2,
        tel: ""
    }
    return strc = { ...strc, ...body}
}

function enviarErrorPassword(body, res){
    const strc = crearObjeto(body);
    return res.render('registroUser', {errors: {
        password: {
            msg: "Password incorrecta"
        }
    }, usuario: strc});
}

module.exports = usersController;