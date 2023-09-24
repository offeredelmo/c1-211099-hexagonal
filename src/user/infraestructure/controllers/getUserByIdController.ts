import { Request, Response } from "express";
import { GetUserByIdUseCase } from "../../application/getUserByIdUseCase";



export class GetUserByIdController {
    constructor(readonly getUserByIdUseCase : GetUserByIdUseCase) {}
    async run(req:Request, res:Response) {
        try {

            let {uuid} =  req.body
        
            let getUserByuuid = await this.getUserByIdUseCase.run(uuid)

            if(getUserByuuid){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        user: getUserByuuid
                    }
                })
            }
        } catch (error) {   
        }
    }
}