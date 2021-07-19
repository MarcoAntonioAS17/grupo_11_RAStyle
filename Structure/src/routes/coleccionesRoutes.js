const express = require('express');
const router = express.Router();
const path = require('path');

const coleccionesController = require('../controllers/coleccionesController');
const detalleProductoController = require("../controllers/detalleProductoController");
const validaciones = require('../validations/products');

const multer = require('multer');
let multerDiskStorage = multer.diskStorage({
    destination:(req, file, callback) => {
        let folder = path.join(__dirname,'../../public/images/productos');
        callback(null,folder);
    },
    filename:(req, file, callback) => {
        let imageName = `${req.params.idProducto}_${Date.now()}_img_${path.extname(file.originalname)}`;
        callback(null,imageName);
    }
})
const upload = multer({storage: multerDiskStorage});

router.get('/', coleccionesController.listadoProductos);

router.get('/busqueda', coleccionesController.busqueda);
router.get('/busqueda/buscar', coleccionesController.leerFormulario);

router.get('/create', coleccionesController.create);
router.post('/', upload.array('photos'), validaciones.nuevoProducto, coleccionesController.createPost);

router.get('/editar', detalleProductoController.editar);

router.get('/:idProducto', detalleProductoController.index);

module.exports = router;