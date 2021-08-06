const pathUser = '../databases/usuarios.json';
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const path = require('path');

const usuarios = require(pathUser);
const fs = require('fs');

const productsFilePath = path.join(__dirname,"../databases/productos.json");
const productos = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const usersController = {
    index: function(req,res) {
        res.render('login.ejs');
    },
    registroUsuario: function(req,res) {
        res.render('registro.ejs');
    },
    iniciarSesion: function(req,res) {
        let errores = validationResult(req);
        if (!errores.isEmpty()) {
            let strc = {
                correo: "",
                password: ""
            }
            strc = {...strc, ...req.body};
            res.render('login.ejs', {errors: errores.mapped(), usuario: strc})
            return;
        }

        const currentUser = req.body;
        
        for (let user of usuarios) {
            if (user.email == currentUser.correo) {
                if (bcrypt.compareSync(currentUser.password, user.password)) {
                    // Guardar datos de sesión
                    req.session.userEmail = currentUser.correo;
                    req.session.userNombre = user.firstName;
                    req.session.logeado = true;
                    req.session.role = user.category;
                    if (currentUser.recordarme != undefined) {
                        res.cookie('user',currentUser.correo, {maxAge: 1800000});
                        res.cookie('logeado',true, {maxAge: 1800000});
                    }

                    res.redirect('/');
                    return;
                } else {
                    let contrasenaIncorrecta = {
                        password: {
                            msg: "Contraseña incorrecta"
                        }
                    }
                    res.render('login.ejs', {errors: contrasenaIncorrecta, usuario: currentUser})
                    return;
                }
            } 
        }
        let noEncontrado = {
            correo: {
                msg: "Usuario no encontrado"
            }
        }
        res.render('login.ejs', {errors: noEncontrado})
        return;
    },
    logout: function(req,res) {
        req.session.userEmail = null;
        req.session.userNombre = null;
        req.session.logeado = false;
        req.session.role = null;
        res.clearCookie('user');
        res.clearCookie('logeado');
        res.redirect('/users/login');
    }
}

module.exports = usersController;