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
            }else{
                return res.status(404).send({
                    status: "error",
                    message: "User not found or not updated."
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "An error occurred while update password."
            });   
        }
    }
}