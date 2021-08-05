const express = require('express');
const router = express.Router();
const path = require('path');

const coleccionesController = require('../controllers/coleccionesController');
const detalleProductoController = require("../controllers/detalleProductoController");
const validaciones = require('../validations/products');

const multer = require('multer');
const multerDiskStorage = multer.diskStorage({
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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/productos');
    },
    filename: function (req, file, cb) {
        cb(null,
            `${req.params.idProducto}_${Date.now()}_img_${path.extname(file.originalname)}`);
    }
});
const uploadFile = multer({ storage });

router.get('/', coleccionesController.listadoProductos);

router.get('/busqueda', coleccionesController.busqueda);
router.get('/busqueda/buscar', coleccionesController.leerFormulario);

router.get('/create', coleccionesController.create);
router.post('/', upload.array('photos'), validaciones.nuevoProducto, coleccionesController.createPost);

router.get('/editar', detalleProductoController.editar);

router.get('/:idProducto', detalleProductoController.index);

router.get('/:idProducto/edit', detalleProductoController.editar);

router.put('/:idProducto/edit', uploadFile.array('photos'), validaciones.actualizar,detalleProductoController.actualizar);

router.delete('/:idProducto',detalleProductoController.delete);

module.exports = router;