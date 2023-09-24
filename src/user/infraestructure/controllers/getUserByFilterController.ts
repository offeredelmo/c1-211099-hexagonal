import { Request, Response } from "express";
import { GetUserByFilterUseCase } from "../../application/getUserByFilterUseCase";



export class GetUserByFilterController {
    constructor(readonly getUserByFilterUseCase : GetUserByFilterUseCase) {}
    async run(req:Request, res:Response) {
        try {
            let {
                filter,
                name,
                phone_number,
                email,
            } = req.query

            console.log('controller', name )
            let getUserByFilter = await this.getUserByFilterUseCase.run(filter as string, email as string, name as string, phone_number as string)

            if(getUserByFilter){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        getUserByFilter
                    }
                })
            }
        } catch (error) {   
        }
    }
}