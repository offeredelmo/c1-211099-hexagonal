import { Request, Response } from "express";

import { UpdateReviewUseCase } from "../../application/updateReviewUseCase";


export class UpdateReviewController {

    constructor(readonly updateReviewUseCase: UpdateReviewUseCase) { }

    async run(req: Request , res: Response) {
        try {

            let {
                uuid_review,
                uuid_user,
                review
            } = req.body;
           
           
            
            let newReview = await this.updateReviewUseCase.run(uuid_review,uuid_user,review);

            if (newReview) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        newReview: newReview
                    }
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An error occurred while adding the review."
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



