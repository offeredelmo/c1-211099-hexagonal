import { Request, Response } from "express";
import { DeleteBookUseCase } from "../../application/deleteBookUseCase";

export class DeleteBookController {

    constructor(readonly deleteBookUseCase: DeleteBookUseCase) { }

    async run(req: Request , res: Response) {
        try {
            let uuid = req.body.uuid;
    
            // Asegúrate de que un UUID fue enviado
            console.log(uuid);
            
            let getBook = await this.deleteBookUseCase.run(uuid);
    
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