import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateResult = (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Extrae los mensajes de los errores
        const errorMessages = errors.array().map(error => error.msg);
        
        // Responde con los mensajes de error
        return res.status(400).send({ errors: errorMessages });
    }

    next();
        
    } catch (error) {
        return error
    }
};

export const validationRegisterUser = [
    check('name')
    .exists().withMessage('name is required.').bail() 
    .notEmpty().withMessage('name is empty'),
    check('last_name')
    .exists().withMessage('last_name is required.').bail() 
    .notEmpty().withMessage('last_name is empty'),
    check('email')
    .exists().withMessage('email is required.').bail()
    .isEmail()
    .notEmpty().withMessage('email is empty'),
    check('password')
    .exists().withMessage('password is required.').bail() 
    .notEmpty().withMessage('password is empty'),
    validateResult
]

export const validationFilter = [
    check('filter')
        .exists().withMessage('Filter is required.').bail()
        .isIn(['email', 'phone_number', 'name']).withMessage('Invalid filter value.'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Detener el flujo y enviar el error
            return res.status(400).json({ errors: errors.array() });
        }

        // Validaciones adicionales basadas en el valor de 'filter'
        if (req.query.filter === 'email' && !req.query.email) {
            return res.status(400).json({ error: 'Email is required when filter is email.' });
        }
        if (req.query.filter === 'name' && !req.query.name) {
            return res.status(400).json({ error: 'Name is required when filter is name.' });
        }
        if (req.query.filter === 'phone_number' && !req.query.phone_number) {
            return res.status(400).json({ error: 'Phone number is required when filter is phone_number.' });
        }

        // Si todo es válido, continuar con el controlador
        next();
    }
];

export const validationgetId = [
    check('uuid')
    .exists().bail()
    .notEmpty().withMessage('uuid is empty'),
    validateResult
]

export const validationUpdateUser = [
    check('uuid')
    .exists().withMessage('uuid is required.').bail()
    .notEmpty().withMessage('uuid is empty'),
    check('name')
    .optional()
    .notEmpty().withMessage('name is empty'),
    check('last_name')
    .optional()
    .notEmpty().withMessage('last_name is empty'),
    check('phone_number')
    .optional()
    .notEmpty().withMessage('phone_number is empty'),
    check('email')
    .optional()
    .notEmpty().withMessage('email is empty')
    .isEmail(),
    validateResult
]

export const validationUpdatePassword = [
    check('uuid')
    .exists().withMessage('uuid is required.').bail()
    .notEmpty().withMessage('uuid is empty'),
    check('password')
    .exists().withMessage('password is required.').bail()
    .notEmpty().withMessage('password is empty'),
    validateResult
]