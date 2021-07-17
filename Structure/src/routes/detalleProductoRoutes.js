const express = require('express');
const router = express.Router();

const detalleProductoController = require("../controllers/detalleProductoController");

router.get('/editar', detalleProductoController.editar);

router.get('/:idProducto', detalleProductoController.index);

router.get('/:idProducto/edit', detalleProductoController.editar);

router.put('/:idProducto/edit',detalleProductoController.actualizar);
module.exports = router;