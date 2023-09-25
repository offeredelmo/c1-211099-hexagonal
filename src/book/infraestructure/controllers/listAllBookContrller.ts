import { Request, Response } from "express";
import { ListAllBookUseCase } from "../../application/listAllBooksUseCase";



export class ListAllBookController {
    constructor(readonly listAllUserUseCase : ListAllBookUseCase) {}
    async run(req:Request, res:Response) {
        try {
            let listAllBooks = await this.listAllUserUseCase.run()

            if(listAllBooks){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        list: listAllBooks
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