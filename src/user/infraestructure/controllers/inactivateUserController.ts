import { Request, Response } from "express";
import { InactivateUserUseCase } from "../../application/inactivateUserUseCase";



export class InactivationUserController {
    constructor(readonly inactivateUserUseCase : InactivateUserUseCase) {}
    async run(req:Request, res:Response) {
        try {
            let {
                uuid,
            } = req.body
        
            let inactivateUser = await this.inactivateUserUseCase.run(uuid)

            if(inactivateUser){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        inactivateUser
                    }
                })
            }
            if (!inactivateUser) {
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