const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const detalleProductoController = require("../controllers/detalleProductoController");
const validaciones = require('../validations/products');

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

router.get('/nuevo', detalleProductoController.nuevo);

router.get('/:idProducto', detalleProductoController.index);

router.get('/:idProducto/edit', detalleProductoController.editar);

router.put('/:idProducto/edit', uploadFile.array('photos'), validaciones.actualizar,detalleProductoController.actualizar);

module.exports = router;