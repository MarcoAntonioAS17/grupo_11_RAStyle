const { check } = require('express-validator');

const validacionesUsuarios = {
    nuevoUsuario: [
        check('firstName')
            .notEmpty().withMessage('Debes ingresar un nombre').bail()
            .isLength( {min: 2}).withMessage('El nombre debe tener más de 2 caracteres'),
        check('lastName')
            .notEmpty().withMessage('Debes ingresar un apellido por lo menos').bail()
            .isLength( {min: 2}).withMessage('El apellido debe tener al menos 2 caracteres'),
        check('email')
            .notEmpty().withMessage('Ingresa un correo').bail()
            .isEmail().withMessage('Ingresa un correo valido'),
        check('password')
            .notEmpty().withMessage('Ingresa una contraseña valida').bail()
            .isStrongPassword().withMessage('La password debe contener min. 8 caracteres, 1 minuscula, 1 mayuscula, 1 número y 1 simbolo.')
    ],
    updatePerfil: [
        check('firstName')
            .notEmpty().withMessage('Debes ingresar un nombre').bail()
            .isLength( {min: 2}).withMessage('El nombre debe tener más de 2 caracteres'),
        check('lastName')
            .notEmpty().withMessage('Debes ingresar un apellido por lo menos').bail()
            .isLength( {min: 2}).withMessage('El apellido debe tener al menos 2 caracteres'),
        check('email')
            .notEmpty().withMessage('Ingresa un correo').bail()
            .isEmail().withMessage('Ingresa un correo valido'),
        check('password')
            .notEmpty().withMessage('Ingresa una contraseña valida').bail()
            .isStrongPassword().withMessage('La password debe contener min. 8 caracteres, 1 minuscula, 1 mayuscula, 1 número y 1 simbolo.'),
        check('tel')
            .isMobilePhone().withMessage('Ingresa un numero de telefono valido.')
            
    ],
    updatePerfilDomicilio: [
        check('calle')
            .notEmpty().withMessage('Ingresa una calle').bail()
            .isLength({min: 3}).withMessage('Ingresa una calle valida'),
        check('num')
            .notEmpty().withMessage('Ingresa número de casa'),
        check('cp')
            .notEmpty().withMessage('Ingresa un CP valido').bail()
            .isLength({min:5}).withMessage('Ingresa un CP valido'),
        check('ciudad')
            .notEmpty().withMessage('Ingresa una ciudad').bail()
            .isLength({min:3}).withMessage('Ingresa una ciudad valida'),
        check('estado')
            .notEmpty().withMessage('Ingresa un estado').bail()
            .isLength({min:3}).withMessage('Ingresa un estado valida'),
        check('pais')
            .notEmpty().withMessage('Ingresa un pais').bail()
            .isLength({min:3}).withMessage('Ingresa un pais valida')
    ]
};

module.exports = validacionesUsuarios;