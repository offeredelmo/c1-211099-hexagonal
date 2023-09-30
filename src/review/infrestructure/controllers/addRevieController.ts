import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { AddReviewUseCase } from "../../application/addReviewUseCase";


export class AddReviewController {

    constructor(readonly addReviewUseCase: AddReviewUseCase) { }
    //si se presta un libro el estatus pasa loan_status true por lo tanto al hacer una review de un libro que ya devolvi no puedo hacerle review /modificar logica despues
    async run(req: Request , res: Response) {
        try {

            let {
                uuid_user,
                uuid_book,
                date,
                review  
            } = req.body;
           
           
            const miuuid: string = uuid();
            let newReview = await this.addReviewUseCase.run(miuuid,uuid_user,uuid_book,date,review);
         
            if (newReview instanceof Error) {
                return res.status(404).send({
                    status: "error",
                    message: newReview.message
                });
            } else if (typeof newReview === 'string') {
                return res.status(409).send({
                    status: "error",
                    message: newReview
                });
            } else if (newReview) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        new_Book: newReview
                    }
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while adding loan book."
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
                message: "An error occurred while adding the book."
            });
        }
    }
}



