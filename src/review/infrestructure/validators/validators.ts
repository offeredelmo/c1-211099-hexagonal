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


export const validatorAddReview = [
    check('id_user').exists().withMessage('title is required.').bail()
    .notEmpty()
    .isString(),
]