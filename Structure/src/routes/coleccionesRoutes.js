const express = require('express');
const router = express.Router();
const path = require('path');

const coleccionesController = require('../controllers/coleccionesController');
const detalleProductoController = require("../controllers/detalleProductoController");
const validaciones = require('../validations/products');
const adminMiddleware = require('../middlewares/adminMiddleware');

const Multer = require('multer');

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024, // no larger than 10mb, you can change as needed.
    },
  });

// Rutas
router.get('/', coleccionesController.listadoProductos);

router.get('/hombres', coleccionesController.productosHombres);
router.get('/mujeres', coleccionesController.productosMujeres);
router.get('/promociones', coleccionesController.productosPromociones);
router.get('/HotSale', coleccionesController.productosHotSale);

router.get('/busqueda', coleccionesController.busqueda);
router.get('/busqueda/buscar', coleccionesController.leerFormularioBusqueda);

router.get('/create', adminMiddleware,coleccionesController.create);
router.post('/create', adminMiddleware, multer.array('photos'), validaciones.nuevoProducto, coleccionesController.createPost);

router.get('/editar', detalleProductoController.editar);

router.get('/:idProducto', detalleProductoController.index);

router.get('/:idProducto/edit', adminMiddleware, detalleProductoController.editar);

router.put('/:idProducto/edit', adminMiddleware, multer.array('photos'), validaciones.actualizar,detalleProductoController.actualizar);

router.delete('/:idProducto', adminMiddleware, detalleProductoController.delete);

module.exports = router;