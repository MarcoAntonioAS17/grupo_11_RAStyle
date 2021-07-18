const { check } = require('express-validator');

const validacionesProductos = {
    actualizar: [
        check('nombre')
            .notEmpty().withMessage("Debes poner nombre de producto").bail()
            .isLength({min: 5}).withMessage("El nombre debe ser más largo"),
        check('coleccion')
            .isNumeric().withMessage("Debe ser número"),
        check('categoria')
            .isNumeric().withMessage("Debe ser número"),
        check('subcategoria')
            .isNumeric().withMessage("Debe ser número"),
        check('precio')
            .isNumeric().withMessage("Debe ser número decimal"),
        check('descripcion')
            .isLength({min:10}).withMessage("Ingresa al menos 10 caracteres"),
        check('color')
            .notEmpty().withMessage("Selecciona al menos un color"),
        check('talla')
            .notEmpty().withMessage("Selecciona al menos una talla"),
        check('cantidad')
            .isNumeric().withMessage("La cantidad debe ser positiva"),
        check('precioOferta')
            .isNumeric().withMessage("El precio oferta debe ser positivo")
    ]   
}

module.exports = validacionesProductos;