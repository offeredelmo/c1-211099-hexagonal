import { Request, Response } from "express";
import { GetBookByIdUseCase } from "../../application/getBookByIdUseCase";


export class GetBookByIdController {

    constructor(readonly getBookByIdUseCase: GetBookByIdUseCase) { }

    async run(req: Request , res: Response) {
        console.log(req.body+"aaaa")
        try {
            let uuid = req.query.uuid as string ;
          
            let getBook = await this.getBookByIdUseCase.run(uuid);
    
            if (getBook) {
                return res.status(200).send({  // Cambiado el código de estado a 200 para OK
                    status: "success",
                    data: {
                        message: getBook
                    }
                });
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "Book not found."
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "An error occurred while fetching the book."
            });
        }
    }
    
}