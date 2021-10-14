require('dotenv').config();
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

// USO DE SEQUELIZE
const db = require("../database/models");
// %%%%%%%%%%%%%%%%
 
const {Storage} = require('@google-cloud/storage');
// Instantiate a storage client
const storage = new Storage();
const bucket = storage.bucket("gs://rastyle-9c7f2.appspot.com");

const usersController = {
    index: async function(req,res) {
        await bucket.makePublic();

        res.render('login.ejs');
    },
    registroUsuario: function(req,res) {
        res.render('registro.ejs');
    },  
    registrarUsuario: async function(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.mapped());
            let strc = crearObjeto(req.body);
            return res.render('registro', {errors: errors.mapped(), usuario: strc});
        }
        const resultsUsers = await db.Usuarios.findOne({where: {email: req.body.email}});
        if (resultsUsers) {
            console.log("Correo ya registrado");
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
            console.log(user.id_CategoriaUsuario);
            req.session.role = user.id_CategoriaUsuario == 2? "user": "admin";
            if (currentUser.recordarme != undefined) {
                res.cookie('user', currentUser.correo, {maxAge: 1800000});
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
        req.session.userEmail = null;
        req.session.userNombre = null;
        req.session.logeado = false;
        req.session.role = null;
        res.clearCookie('user');
        res.clearCookie('logeado');
        res.redirect('/users/login');
    },
    perfil: async function (req, res) {     
        
        const session = req.session;
        let  usuario = await db.Usuarios.findOne({
            where: { email: session.userEmail }
        });
        usuario = crearObjeto(usuario.dataValues); 
        return res.render('registroUser', {usuario})
        //Validar que pasa si por alguna razón el usuario no existe 
    },
    actualizarPerfil: async function (req, res, next) {
        
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
            
            file.originalname = `img_${Date.now()}_${file.originalname}`;
            const blob = bucket.file(file.originalname);
            const blobStream = blob.createWriteStream();
            if (OldData.image) {
                const oldImage = OldData.image.split('rastyle-9c7f2.appspot.com/');
                console.log(oldImage);
                console.log(oldImage[1]);
                bucket.file(oldImage[1]).delete();
                
                console.log(`--> deleted`);
                  
            }
            OldData.image =  `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            
            blobStream.on('error', err => {
            next(err);
            });
            blobStream.on('finish', () => {
                // The public URL can be used to directly access the file via HTTP.
                OldData.image =  `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                console.log(OldData.image);
            });
            blobStream.end(file.buffer);
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
        const session = req.session;

        const user = await db.Usuarios.findOne({
            where: { email: session.userEmail}
        });
        //validar usuario no encontrado
        const usuario = crearObjeto(user.dataValues);
        res.render('registroDomicilioUser', {usuario});
    },
    actualizarPerfilDomicilio: async function(req, res) {
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