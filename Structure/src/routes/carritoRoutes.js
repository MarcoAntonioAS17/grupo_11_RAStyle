const express = require('express');
const router = express.Router();

const carritoController = require("../controllers/carritoController");

const loggedMeddleware = require('../middlewares/loggedMiddleware')

router.get('/', loggedMeddleware, carritoController.index);


module.exports = router;