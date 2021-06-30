const express = require('express');
const router = express.Router();

const coleccionesController = require('../controllers/coleccionesController');

router.get('/playeras', coleccionesController.listadoProductos);

module.exports = router;