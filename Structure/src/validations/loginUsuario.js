const { check } = require('express-validator');

const validacionesUsuarios = {
    formatoDatosLogin: [
        check('correo')
            .notEmpty().withMessage('Introduce un email').bail()
            .isEmail().withMessage('Ingresa una dirección de Email válida').bail(),
        check('password')
            .notEmpty().withMessage('Escribe tu contraseña').bail()
            .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}).withMessage('La contraseña debe de tener al menos 8 caracteres, una mayúscula, una minúscula, un número, y un caracter especial').bail()
    ]
}

module.exports = validacionesUsuarios;