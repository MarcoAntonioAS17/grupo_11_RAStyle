const express = require('express');
const router = express.Router();

const detalleProductoController = require("../controllers/detalleProductoController");

router.get('/editar', detalleProductoController.editar);

router.get('/:idProducto', detalleProductoController.index);


module.exports = router;