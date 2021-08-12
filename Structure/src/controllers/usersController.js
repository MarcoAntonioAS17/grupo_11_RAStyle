const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');

const pathFileUser = path.join(__dirname,'../databases/usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(pathFileUser, "utf-8"));

const productsFilePath = path.join(__dirname,"../databases/productos.json");
const productos = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const usersController = {
    index: function(req,res) {
        res.render('login.ejs');
    },
    registroUsuario: function(req,res) {
        res.render('registro.ejs');
    },
    registrarUsuario: (req, res, next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Errores\n\n");
            console.log(errors.mapped());

            let strc = {
                nombre: "",
                apellido: "",
                correo: "",
                password: ""
            }
            strc = { ...strc, ...req.body}
            res.render('registro', {errors: errors.mapped(), usuario: strc});
            return;
        }
        const newUser = req.body;
        newUser.password = bcrypt.hashSync(newUser.password, 12);
        
        const esqueleto = {
            id: (usuarios.length+1).toLocaleString('en-US', {
                    minimumIntegerDigits: 6,
                    useGrouping: false
                }),
            firstName: newUser.nombre,
            lastName: newUser.apellido,
            email: newUser.correo,
            password: newUser.password,
            category: "user",
            image: "",
            direccion: { 
               cp: null,
               calle: "",
               num: "",
               num_inter: "",
               ref: "",
               ciudad: "",
               estado: "",
               pais:  ""
            },
            tel: ""
        }
        usuarios.push(esqueleto);
        fs.writeFileSync (pathFileUser, JSON.stringify(usuarios,null,2));
        
        req.session.userNombre = esqueleto.firstName;
        req.session.userEmail = newUser.correo;
        req.session.logeado = true;
        req.session.role = esqueleto.category;
        
        res.redirect('/users/info');
        
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

                    res.redirect('/users/info');
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
    },
    perfil: (req, res) => {     
        
        const session = req.session;

        const user = usuarios.find( elem => elem.email === session.userEmail);
        const usuario = {
            firstName: user.firstName,
            lastName: user.lastName,
            tel: user.tel,
            email: user.email,
            image: user.image
        }
        res.render('registroUser', {usuario});
    },
    actualizarPerfil: (req, res) => {
        
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.mapped());
            let strc = {
                firstName: "",
                lastName: "",
                email: "",
                tel: ""
            }
            strc = { ...strc, ...req.body}
            res.render('registroUser', {errors: errors.mapped(), usuario: strc});
            return;
        }

        let findIndex = usuarios.findIndex(elem => elem.email === req.session.userEmail);
        
        if (!bcrypt.compareSync(req.body.password, usuarios[findIndex].password)) {
            let strc = {
                firstName: "",
                lastName: "",
                email: "",
                tel: ""
            }
            strc = { ...strc, ...req.body}
            res.render('registroUser', {errors: {
                password: {
                    msg: "Password incorrecta"
                }
            }, usuario: strc});
            return;
        }
        const file = req.file;
        if (file) {
            usuarios[findIndex].image = '/images/profilePictures/'+file.filename;
        }

        const dataUpdated = req.body;
        dataUpdated.password = bcrypt.hashSync(dataUpdated.password, 12);
        usuarios[findIndex] = {...usuarios[findIndex], ...dataUpdated}

        fs.writeFileSync (pathFileUser, JSON.stringify(usuarios,null,2));
        req.session.userNombre = usuarios[findIndex].firstName;
        req.session.userEmail = usuarios[findIndex].email;
        
        res.redirect('/users/info');
    },
    perfilDomicilio: (req, res) => {
        const session = req.session;

        const user = usuarios.find( elem => elem.email === session.userEmail);
        const usuario = {
            calle: user.direccion.calle,
            num: user.direccion.num,
            num_inter: user.direccion.num_inter,
            cp: user.direccion.cp,
            ciudad: user.direccion.ciudad,
            estado: user.direccion.estado,
            pais: user.direccion.pais,
            ref: user.direccion.ref
        }
        res.render('registroDomicilioUser', {usuario});
    },
    actualizarPerfilDomicilio: (req, res) => {
        console.log(req.body);
        
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("====Errores de validacion====")
            console.log(errors.mapped());
            let strc = {
                calle: "",
                num: "",
                num_inter: "",
                cp: "",
                ciudad: "",
                estado: "",
                pais: "",
                ref: ""
            }
            strc = { ...strc, ...req.body}
            res.render('registroDomicilioUser', {errors: errors.mapped(), usuario: strc});
            return;
        }

        let findIndex = usuarios.findIndex(elem => elem.email === req.session.userEmail);
        const dataUpdated = req.body;
        usuarios[findIndex].direccion = {...usuarios[findIndex].direccion, ...dataUpdated}

        fs.writeFileSync (pathFileUser, JSON.stringify(usuarios,null,2));
        console.log(usuarios[findIndex]);
        res.redirect('/users/info/domicilio');
    }
}

module.exports = usersController;