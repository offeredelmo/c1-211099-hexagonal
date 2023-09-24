import { Request, Response } from "express";
import { DeleteUserUseCase } from "../../application/deleteUserUseCase";



export class DeleteUserController {
    constructor(readonly deleteUserUseCase : DeleteUserUseCase) {}
    async run(req:Request, res:Response) {
        try {

            let {
                uuid,
            } = req.body
        
            let UpdateUserById = await this.deleteUserUseCase.run(uuid)

            if(UpdateUserById){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        eliminate: UpdateUserById
                    }
                })
            }
            else{
                return res.status(404).send({
                    status: "error",
                    message: "User not found or not delete."
                });
            }
        } catch (error) {   
            return res.status(500).send({
                status: "error",
                message: "An error occurred while delete the user."
            });
        }
    }
}