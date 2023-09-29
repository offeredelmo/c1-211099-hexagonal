import { Request, Response } from "express";
import { GetReviewByIdUseCase } from "../../application/getReviewByIdUseCase";
import { DeleteReviewUseCase } from "../../application/deleteReviewUseCase";

export class DeleteReviewController {
    constructor(readonly deleteReviewUseCase : DeleteReviewUseCase) {}
    async run(req:Request, res:Response) {

        try {
            let {
                uuid_review,
                uuid_user
            } = req.query

            let deleteReview = await this.deleteReviewUseCase.run(uuid_review as string, uuid_user as string)

            if (deleteReview instanceof Error) {
                return res.status(400).send({
                    status: "error",
                    message: deleteReview.message
                });
            } else if (deleteReview) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        new_Review: deleteReview
                    }
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
                message: "An error occurred while delete the reviews."
            });
        }

    }
   
}