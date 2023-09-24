import { Request, Response } from "express";
import { UpdateUserByIdUseCase } from "../../application/updateUserByIdUseCase";
import { UpdatePasswordUserUsecase } from "../../application/updatePasswordUserUseCase";



export class UpdatePasswordController {
    constructor(readonly updatePasswordUseCase : UpdatePasswordUserUsecase) {}
    async run(req:Request, res:Response) {
        try {

            let {
                uuid,
                password,
            } = req.body
        
            let updatePasswor = await this.updatePasswordUseCase.run(uuid,password)

            if(updatePasswor){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        update_user: updatePasswor
                    }
                })
            }
        } catch (error) {   
        }
    }
}