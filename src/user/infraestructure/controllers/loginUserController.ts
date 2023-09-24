import { Request, Response } from "express";

import { LoginUserUseCase } from "../../application/loginUserUseCase";

export class LoginUserController {
    constructor(readonly loginUserController: LoginUserUseCase) {}

    async run(req:Request,res:Response) {
        
        try {
           
            let {
               email,
               password
            } = req.body

            

    
            let loginUser = await this.loginUserController.run(email, password)
            if(loginUser === 'Unauthorized'){
                return res.status(404).send({
                    status: "Unauthorized",
                });
            }
            if(loginUser === null){
                return res.status(404).send({
                    status: "Unauthorized",
                });
            }
            if (loginUser) {
                return res.status(201).send({
                   token: loginUser
                })
            }
             
        } catch (error) {
            // Para otros errores, puedes enviar un mensaje genérico y un código de estado HTTP 500.
            return res.status(500).send({
                status: "error",
                message: "An unexpected error occurred. Please try again later.",
            });
        }
    }
}