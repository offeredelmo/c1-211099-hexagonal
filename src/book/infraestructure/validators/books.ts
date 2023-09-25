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
    .exists().withMessage('uuid is required.').bail()
    .isString(),
    validateResult
]