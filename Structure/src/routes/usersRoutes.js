const express = require('express');
const router = express.Router();
const path = require('path');

const validacionesLoginUsuario = require('../validations/loginUsuario')
const usersController = require('../controllers/usersController');

router.get('/login', usersController.index);
router.post('/login', validacionesLoginUsuario.formatoDatosLogin, usersController.iniciarSesion);

router.get('/logout', usersController.logout);

module.exports = router;