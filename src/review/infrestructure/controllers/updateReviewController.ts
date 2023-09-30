import { Request, Response } from "express";

import { UpdateReviewUseCase } from "../../application/updateReviewUseCase";
import { Review } from "../../domain/review";


export class UpdateReviewController {

    constructor(readonly updateReviewUseCase: UpdateReviewUseCase) { }

    async run(req: Request , res: Response) {
        try {

            let {
                uuid_review,
                uuid_user,
                review
            } = req.body;
           
           
            
            let updateReview = await this.updateReviewUseCase.run(uuid_review,uuid_user,review);

            if (updateReview instanceof Error) {
                return res.status(404).send({
                    status: "error",
                    message: updateReview.message
                });
            } else if (updateReview === 'unauthorized') {
               return res.status(401).send({
                    status: "error",
                    data: {
                        message: "unauthorized este usuario no es dueño de a review"
                    }
                });
            } else if (updateReview instanceof Review ) {
                return res.status(200).send({
                    status: "success",
                    message: updateReview
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while delete the Review."
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



