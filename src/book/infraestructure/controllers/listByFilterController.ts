import { Request, Response } from "express";

import { ListByFilterUseCase } from "../../application/listByFilterUseCase";



export class ListByFilterController {
    constructor(readonly listByFilterUseCase : ListByFilterUseCase) {}
    async run(req:Request, res:Response) {
        try {
           
            let filter = req.query.filter as string;
            let title = req.query.title as string | undefined;
            let author = req.query.author as string | undefined;
            let invoice = req.query.invoice as string | undefined;
            let unique_code = req.query.unique_code as string | undefined;
            
            let listByFilter = await this.listByFilterUseCase.run(filter,title,author,invoice,unique_code)

            if(listByFilter){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        list: listByFilter
                    }
                })
            }else{
                return res.status(404).send({
                    status: "ok",
                    message: "Books not found"
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
                message: "An error occurred while list the books."
            });
        }

    }
}