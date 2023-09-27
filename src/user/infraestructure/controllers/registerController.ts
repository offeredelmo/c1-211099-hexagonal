import { Request, Response } from "express";
import { RegisterUserUseCase } from "../../application/registerUseCase";
import { v4 as uuid } from "uuid";
import { compare, encrypt } from '../../../helpers/ashs';


export class ResgisterUserController {
    constructor(readonly registerUserUseCase: RegisterUserUseCase) { }
    async run(req: Request, res: Response) {
        console.log('controller')

        try {

            let {
                name,
                last_name,
                phone_number,
                email,
                password,
            } = req.body    
            console.log(req.body)

            const miuuid: string = uuid()
            const load_status = false
            const status = false
            const hashPassword = await encrypt(password)

            let registerUser = await this.registerUserUseCase.run(
                miuuid,
                name,
                last_name,
                phone_number,
                email,
                hashPassword,
                load_status,
                status
            )

            if (registerUser) {
                return res.status(201).send({
                    status: "succes",
                    data: {
                        id: registerUser.uuid,
                        name: registerUser.name,
                        email: registerUser.email,
                        phone_number: registerUser.phone_number
                    }
                })
            }

        } catch (error) {
            // Manejo de errores específicos
            if (error instanceof Error) {
                if (error.message.includes('Duplicate entry') && error.message.includes('for key \'users.email\'')) {
                    return res.status(409).send({
                        status: "error",
                        message: "The email address is already in use. Please use a different email address.",
                    });
                } else if (error.message.startsWith('[')) {  // Suponiendo que los errores de validación comienzan con un corchete
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)  // Convertimos el mensaje de error en un objeto
                    });
                }
            }

            // Para errores generales, se devuelve un error 500 con un mensaje genérico
            return res.status(500).send({
                status: "error",
                message: "An unexpected error occurred. Please try again later.",
            });
        }
    }
}