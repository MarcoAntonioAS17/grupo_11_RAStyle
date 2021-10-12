const express = require('express');
const router = express.Router();
const path = require('path');

const validacionesLoginUsuario = require('../validations/loginUsuario')
const usersController = require('../controllers/usersController');
const noLoggedMiddleware = require('../middlewares/noLoggedMiddleware')
const loggedMeddleware = require('../middlewares/loggedMiddleware')
const validaciones = require('../validations/userValidations');

const Multer = require('multer');

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
  });
  

// Rutas
router.get('/register', noLoggedMiddleware, usersController.registroUsuario)
router.post('/register', noLoggedMiddleware, validaciones.nuevoUsuario, usersController.registrarUsuario);

router.get('/login', noLoggedMiddleware, usersController.index);
router.post('/login', validacionesLoginUsuario.formatoDatosLogin, usersController.iniciarSesion);


router.get('/info/domicilio', loggedMeddleware, usersController.perfilDomicilio);
router.post('/info/domicilio/', loggedMeddleware, validaciones.updatePerfilDomicilio, usersController.actualizarPerfilDomicilio);

router.get('/info', loggedMeddleware, usersController.perfil);
router.put('/info/:id', loggedMeddleware, multer.single('image'), validaciones.updatePerfil, usersController.actualizarPerfil);

router.get('/logout', usersController.logout);


module.exports = router;