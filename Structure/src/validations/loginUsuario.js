const { check } = require('express-validator');

const validacionesUsuarios = {
    formatoDatosLogin: [
        check('correo')
            .notEmpty().withMessage('Introduce un email').bail()
            .isEmail().withMessage('Ingresa una dirección de Email válida').bail(),
        check('password')
            .notEmpty().withMessage('Escribe tu contraseña').bail()
            .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}).withMessage('Contraseña invalida').bail()
    ]
}

module.exports = validacionesUsuarios;