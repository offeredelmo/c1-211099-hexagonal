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
            }
        } catch (error) {   
        }
    }
}