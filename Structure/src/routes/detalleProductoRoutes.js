const express = require('express');
const router = express.Router();

const detalleProductoController = require("../controllers/detalleProductoController");

router.get('/:idProducto', detalleProductoController.index);

router.get('/editar', detalleProductoController.editar);


module.exports = router;