import { Request, Response } from "express";
import { UpdateUserByIdUseCase } from "../../application/updateUserByIdUseCase";



export class UpdateUserByIdController {
    constructor(readonly updateUserByIdUseCase : UpdateUserByIdUseCase) {}
    async run(req:Request, res:Response) {
        try {

            let {
                uuid,
                name,
                last_name, 
                phone_number,
                email,
            } = req.body
        
            let UpdateUserById = await this.updateUserByIdUseCase.run(uuid,name,last_name,phone_number,email)

            if(UpdateUserById){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        update_user: UpdateUserById
                    }
                })
            }else{
                return res.status(404).send({
                    status: "error",
                    message: "User not found "
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
                message: "An error occurred while update the user."
            });   
        }
    }
}