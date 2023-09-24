import { Request, Response } from "express";
import { ListAllUserUseCase } from "../../application/listAllUserUseCase";


export class ListAllUserController {
    constructor(readonly listAllUserUseCase : ListAllUserUseCase) {}
    async run(req:Request, res:Response) {
        try {
            let listAllUser = await this.listAllUserUseCase.run()

            if(listAllUser){
                return res.status(200).send({
                    status:"succes",
                    data:{
                       listAllUser
                    }
                })
            }
        } catch (error) {
            
        }

    }
   
}