const express = require('express');
const router = express.Router();
const path = require('path');

const validacionesLoginUsuario = require('../validations/loginUsuario')
const usersController = require('../controllers/usersController');
const noLoggedMiddleware = require('../middlewares/noLoggedMiddleware')
const loggedMeddleware = require('../middlewares/loggedMiddleware')
const validaciones = require('../validations/userValidations');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/profilePictures');
    },
    filename: function (req, file, cb) {
        cb(null,
            `${req.session.userNombre}${Date.now()}img${path.extname(file.originalname)}`);
    }
});
const uploadFile = multer({ storage });

// Rutas
router.get('/register', noLoggedMiddleware, usersController.registroUsuario)
router.post('/register', noLoggedMiddleware, validaciones.nuevoUsuario, usersController.registrarUsuario);

router.get('/login', noLoggedMiddleware, usersController.index);
router.post('/login', validacionesLoginUsuario.formatoDatosLogin, usersController.iniciarSesion);


router.get('/info/domicilio', loggedMeddleware, usersController.perfilDomicilio);
router.put('/domicilio/:id', loggedMeddleware, validaciones.updatePerfilDomicilio, usersController.actualizarPerfilDomicilio);

router.get('/info', loggedMeddleware, usersController.perfil);
router.put('/info/:id', loggedMeddleware, uploadFile.single('image'), validaciones.updatePerfil, usersController.actualizarPerfil);

router.get('/logout', usersController.logout);


module.exports = router;