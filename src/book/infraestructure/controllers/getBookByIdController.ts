import { Request, Response } from "express";
import { GetBookByIdUseCase } from "../../application/getBookByIdUseCase";

export class GetBookByIdController {

    constructor(readonly getBookByIdUseCase: GetBookByIdUseCase) { }

    async run(req: Request , res: Response) {
        try {

            let {
                uuid,
            } = req.body;
            // Asegúrate de que un archivo fue enviado
            console.log(req.body)
            let getBook = await this.getBookByIdUseCase.run(uuid);

            if (getBook) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        message: getBook
                    }
                });
            }  if (getBook == null) {
                return res.status(404).send({
                    status: "error",
                    message: "Book not found."
                });
            }

        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "An error occurred while delete the book."
            });
        }
    }
}