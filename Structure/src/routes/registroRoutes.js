const express = require('express');
const router = express.Router();

const registroController = require("../controllers/registroController");

router.get('/', registroController.index);

router.get('/usuario/domicilio', registroController.perfilDomicilio);
router.get('/usuario/general', registroController.perfil);

module.exports = router;