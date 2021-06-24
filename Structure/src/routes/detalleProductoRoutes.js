const express = require('express');
const router = express.Router();

const detalleProductoController = require("../controllers/detalleProductoController");

router.get('/', detalleProductoController.index);


module.exports = router;