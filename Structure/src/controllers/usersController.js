require('dotenv').config();
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

// USO DE SEQUELIZE
const db = require("../database/models");
// %%%%%%%%%%%%%%%%
 
/**
const firebase = require('firebase-admin');

const serviceAccount = {
    "type": "service_account",
    "project_id": "rastyle-9c7f2",
    "private_key_id": "637b04caabbf6ef0f9d09f06701e5544c1b10387",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDRnYVBsgE0s9F3\nx6G0faqPNADezfb/S+eKK6UFjPowSb/pt9yxoAfzC97j8lOwxBNFPr8xG/ccXLG4\noZKN6LJ7OUtOKMI4k8uY5dLNUdRGV2dxzS/t030ZHnW9RwgSFfXmY/6GIg9eArGm\ngFD+Di4K4O1z8qDr1ksHfKcOj6WC6K99/dBeTU1CnWneSwOo5aHx4ukMvLrOHJhY\nmuRsiBYrPXt2cg9sVqYWxGhkNrKRsOQoX3TPByhGLwj+hJt9fr2RnhYoe/aMsdFQ\n0CYVLtdXOWBPOlYvg3rL0sCnXx9iptHBfBlwPCvgwD3LOhtALt5bJ5397bYgbTsX\n1iIjnpljAgMBAAECggEASqN0V7gyhbmh1KzY/5Pfr64swSlF0hINGD4CPL++NoOM\nOoSlqPn62qhXbYNUGZU352g4XBxBGXBIOB4QOUeqhgYYsnQA9HRsAr2TGlkQ5Rsq\nUnNlpaGw4cje087/KLF5JdhlQQ3PuwHqkAcQz+XsryL4aljyxAdCICBau+yaWsoq\n1ZF63ALKp0ByUYgJP7GQovuGSxgqg8yciRTKv4NXMUpmCli4+8HiRZoDso1ig8Ex\neJYNtbghf7yqy7USMQqwhzmtVHsLNUcBwFlrOzWl/N4FS5CtfdjhLGf9fp5eHNQJ\nRZeZwOCrxTh0zvgtW0ZKzetnVu9Q9FnprQtbmaGPAQKBgQDxiDxOS4j5ZWIgloXy\npfIJKPR8L+DHButbE03vt0zjcn61erB9Kv/3Vw/SUtPiL7lRXWDabT6nKtlAy8LE\ni/db5EsYdHEyggE1DeLAPEA5q6Cb2flrw4cggXLfr2bX2TTcV9gZMlbkrFqgP2fi\n2JIqQpdcoRpS9rjDds0DBFsysQKBgQDeK9t7FHXLuU2cdNpzIbmVOXvLfBNEpo3/\n3PAP9FpHpVUdsVkZRVgbwRAE8r7R8yvo3gtCZ1X7+WQ8IIEYQjc8+MZY6Ff/zcJZ\nTnogungf9+e6nIFSLAaLNBIDeWAjFLLsRIILYdnn6z7NeF8HqMdgacMv31d4L3c7\nQrmD0UZKUwKBgCTMjeub5I2i3bV7WYMjt2Gf5Mf6/3MzYa5pnYk1UzigHCAIRlV7\ntK35jMaNqgyfGswDvxroZBBSHfGaWd1aOeC9QpfCPfDlD8wGhpKlW1+t/3VfW3oI\nu1C/iEH+VlvykvQzShBktAp5HAGoR2qvdm2L4cXSIdGcF4BoXEnmYwKxAoGBAILk\nTdu2kyviUVJTGfxoqyC6jC+3OtbgVZqfvSN5L9M0GfBzcu3Lh/xaAykXJsskvALn\nBrUpkmPwa1htQgFbyZV3b8wjnuzLeawJ6zPrCCi1cmXkHOCfpX9Pvyki0jv4zu0Z\n84/nJ21WkFqXh01I56XqyZ8jszHQrStRxWBe5E2XAoGAOSnDaYG8egMRCMyM2xSU\niU+AxqBeofwalaMHiTkc+L0jqxRhc6DHxKcrnx5Oh4VjcnXNJxb70k0Z2KsPSX3U\nzXjbGRhz2E8FST/TRUI10WOiDO58mP95Zm4Un8PlvLHAgjqg9OmQ74MmPVtkK1ee\nODT3i3v3x86zAKVuI2qbA54=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-e5oqz@rastyle-9c7f2.iam.gserviceaccount.com",
    "client_id": "118216238293434671203",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-e5oqz%40rastyle-9c7f2.iam.gserviceaccount.com"
};

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
});

const storage = firebase.storage();
const FileName = "Test1633920447278img.png";
const FilePath = './public/images/profilePictures/' +FileName;

async function subirFoto () {
    console.log("->Subiendo foto");
    return await storage.bucket("gs://rastyle-9c7f2.appspot.com")
        .upload(FilePath,{
            destination: `${FileName}`,
        }, (err, file) => {
            console.log(file);
            console.log(err);
        }).makePublic();
}
**/


/**
// // Import the functions you need from the SDKs you need

// const firebase = require('firebase');
// const { initializeApp } = require('firebase/app');
// const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require('firebase/storage');

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyArpsi7-QCKA7co1vatlcMSyE4OU1vz7gg",
//   authDomain: "rastyle-9c7f2.firebaseapp.com",
//   projectId: "rastyle-9c7f2",
//   storageBucket: "rastyle-9c7f2.appspot.com",
//   messagingSenderId: "116858363189",
//   appId: "1:116858363189:web:60c178fe00e175d6df007c"
// };

// // Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
// const storage = getStorage(firebaseApp);
// const storageRef = ref(storage);
**/

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
        // if (file) {
        //     OldData.image = '/images/profilePictures/'+file.filename;
        // }
        console.log(file);
        const blob = bucket.file(file.originalname);
        const blobStream = blob.createWriteStream();
      
        blobStream.on('error', err => {
          next(err);
        });
      
        blobStream.on('finish', () => {
          // The public URL can be used to directly access the file via HTTP.
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}${now}`;
            
            res.status(200).send(publicUrl);
        });
        console.log(file.buffer);
        blobStream.end(file.buffer);
      

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