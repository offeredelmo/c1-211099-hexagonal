import { Request, Response } from "express";
import { ActivateUserUseCase } from "../../application/activeUser.UseCase";



export class ActivateUserController {
    constructor(readonly activateUserUseCase : ActivateUserUseCase) {}
    async run(req:Request, res:Response) {
        try {
            let {
                uuid,
            } = req.body
        
            let activateUser = await this.activateUserUseCase.run(uuid)

            if(activateUser){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        activateUser
                    }
                })
            }
            if (!activateUser) {
                return res.status(404).send({
                    status: "error",
                    message: "user not found"
                });
            }
        } catch (error) {   
            if (error instanceof Error) {
                if (error.message.startsWith('[')) {
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)
                    });
                }
            } 
            return res.status(500).send({
                status: "error",
                message: "An error occurred while activating the user."
            });
        }
    }
}