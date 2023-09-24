import { Request, Response } from "express";
import { ListAllUserActiveUseCase } from "../../application/listAllUserInactiveUseCase";


export class ListAllUsersActiveController {
    constructor(readonly listAllUserActiveUseCase : ListAllUserActiveUseCase) {}
    async run(req:Request, res:Response) {
        try {
            let listAllUserInactive = await this.listAllUserActiveUseCase.run()

            if(listAllUserInactive){
                return res.status(200).send({
                    status:"succes",
                    data:{
                       listAllUserInactive
                    }
                })
            }else{
                return res.status(200).send({
                    status: "ok",
                    message: "no inactive users."
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "An error occurred while list the user."
            });   
        }
    }
}