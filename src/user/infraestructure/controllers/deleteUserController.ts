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
        } catch (error) {   
        }
    }
}