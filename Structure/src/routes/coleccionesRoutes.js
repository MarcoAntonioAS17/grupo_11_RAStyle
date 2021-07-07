const express = require('express');
const router = express.Router();

const coleccionesController = require('../controllers/coleccionesController');
const detalleProductoController = require("../controllers/detalleProductoController");

router.get('/playeras', coleccionesController.listadoProductos);

router.get('/busqueda', coleccionesController.busqueda);
router.post('/', coleccionesController.leerFormulario);

router.get('/playeras/editar', detalleProductoController.editar);

router.get('/playeras/:idProducto', detalleProductoController.index);

module.exports = router;