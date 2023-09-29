import { Request, Response } from "express";
import { UpdateUserByIdUseCase } from "../../application/updateUserByIdUseCase";
import { UpdatePasswordUserUsecase } from "../../application/updatePasswordUserUseCase";



export class UpdatePasswordController {
    constructor(readonly updatePasswordUseCase: UpdatePasswordUserUsecase) { }
    async run(req: Request, res: Response) {
        try {

            let {
                uuid,
                password,
            } = req.body

            let updatePasswor = await this.updatePasswordUseCase.run(uuid, password)

            if (updatePasswor) {
                return res.status(200).send({
                    status: "succes",
                    data: {
                        update_user: updatePasswor
                    }
                })
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "User not found"
                });
            }
        } catch (error) {

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
            return res.status(500).send({
                status: "error",
                message: "An error occurred while update password."
            });
        }
    }
}