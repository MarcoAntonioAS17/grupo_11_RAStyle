const express = require('express');
const router = express.Router();
const path = require('path');

const validacionesLoginUsuario = require('../validations/loginUsuario')
const usersController = require('../controllers/usersController');
const noLoggedMiddleware = require('../middlewares/noLoggedMiddleware')

// Rutas
router.get('/register', noLoggedMiddleware, usersController.registroUsuario);

router.get('/login', noLoggedMiddleware, usersController.index);
router.post('/login', validacionesLoginUsuario.formatoDatosLogin, usersController.iniciarSesion);

router.get('/logout', usersController.logout);


module.exports = router;