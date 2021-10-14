const express = require('express');
const router = express.Router();
const path = require('path');

const APIController = require('../controllers/APIController');

// Rutas
router.get('/users', APIController.listUsers)
router.get('/users/:id', APIController.userDetail);
router.get('/products', APIController.listProducts)
router.get('/products/:id', APIController.productDetail);
router.get('/subcategory', APIController.productsBySubcategory);


module.exports = router;