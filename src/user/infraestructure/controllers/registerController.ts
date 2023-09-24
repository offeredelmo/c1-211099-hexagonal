import { Request, Response } from "express";
import { RegisterUserUseCase } from "../../application/registerUseCase";
import { v4 as uuid } from "uuid";

export class ResgisterUserController {
    constructor(readonly registerUserUseCase: RegisterUserUseCase) {}
    async run(req:Request,res:Response) {
        
        try {
           
            let {
                name,
                last_name, 
                phone_number,
                email,
                password,
            } = req.body

            const miuuid:string =  uuid()
            const load_status = false
            const status = false
            let registerUser = await this.registerUserUseCase.run(
                miuuid,
                name,
                last_name,
                phone_number,
                email,
                password,
                load_status,
                status
            )
            if (registerUser) {
                return res.status(201).send({
                    status:"succes",
                    data:{
                        id:registerUser.uuid,
                        name:registerUser.name,
                        email:registerUser.email,
                        phone_number:registerUser.phone_number
                    }
                })
            }
            
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.includes('Duplicate entry') && error.message.includes('for key \'users.email\'')) {
                    return res.status(409).send({
                        status: "error",
                        message: "The email address is already in use. Please use a different email address.",
                    });
                }
            }
        
            // Para otros errores, puedes enviar un mensaje genérico y un código de estado HTTP 500.
            return res.status(500).send({
                status: "error",
                message: "An unexpected error occurred. Please try again later.",
            });
        }
    }
}