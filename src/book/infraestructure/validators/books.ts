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


export const validationAddBook = [
    check("title")
        .exists().withMessage('title is required.').bail()
        .notEmpty()
        .isString(),
    check("author")
        .exists().withMessage('author is required.').bail()
        .notEmpty()
        .isString(),
    check("description")
        .exists().withMessage('description is required.').bail()
        .notEmpty()
        .isString(),
    check("invoice")
        .exists().withMessage('invoice is required.').bail()
        .notEmpty()
        .isString(),
    check("unique_code")
        .exists().withMessage('unique_code is required.').bail()
        .notEmpty()
        .isString(),
    validateResult
]


export const validationUpdateBook = [
    check('uuid')
        .exists().withMessage('uuid is required.').bail()
        .notEmpty().withMessage('uuid is empty'),
    check('title')
        .optional()
        .notEmpty().withMessage('title is empty'),
    check('author')
        .optional()
        .notEmpty().withMessage('author is empty'),
    check('description')
        .optional()
        .notEmpty().withMessage('description is empty'),
    validateResult
]

export const validationUuid = [
    check('uuid')
        .exists().withMessage('uuid is required.').bail(),
    validateResult
]


export const validationListByFilter = [
    check('filter')
        .exists().withMessage('Filter is required.')
        .bail()
        .isString()
        .notEmpty().withMessage('filter not empty.')
        .bail()
        .isIn(['title', 'author', 'invoice', 'unique_code']).withMessage('Invalid filter value.')
        .bail(),
     
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        console.log(req.query.filter); // Cambiado a req.query
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Validaciones adicionales basadas en el valor de 'filter'
        if (req.query.filter === 'title' && !req.query.title) {
            return res.status(400).json({ error: 'title is required when filter is title.' });
        }
        if (req.query.filter === 'author' && !req.query.author) {
            return res.status(400).json({ error: 'author is required when filter is author.' });
        }
        if (req.query.filter === 'invoice' && !req.query.invoice) {
            return res.status(400).json({ error: 'invoice is required when filter is invoice.' });
        }
        if (req.query.filter === 'unique_code' && !req.query.unique_code) {
            return res.status(400).json({ error: 'unique_code is required when filter is unique_code.' });
        }

        // Si todo es válido, continuar con el controlador
        next();
    }
];
