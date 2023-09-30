import { Request, Response } from "express";
import { ListAllBooksInactiveUseCase } from "../../application/listAllBooksInactiveUseCase";

export class ListAllBooksInactiveController {
    constructor(readonly listAllBooksInactiveUseCase : ListAllBooksInactiveUseCase) {}
    async run(req:Request, res:Response) {
        try {
            let listAllBooksInactive = await this.listAllBooksInactiveUseCase.run()
            if(listAllBooksInactive){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        list: listAllBooksInactive
                    }
                })
            }else{
                return res.status(200).send({
                    status: "ok",
                    message: "Books not found"
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "An error occurred while list the books."
            });
        }

    }
   
}