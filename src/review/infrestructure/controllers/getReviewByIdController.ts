import { Request, Response } from "express";
import { GetReviewByIdUseCase } from "../../application/getReviewByIdUseCase";

export class GetReviewByIdController {
    constructor(readonly getReviewByIdUseCase : GetReviewByIdUseCase) {}
    async run(req:Request, res:Response) {

        try {
            let {
                uuid
            } = req.query

            let getReview = await this.getReviewByIdUseCase.run(uuid as string)

            if (getReview instanceof Error) {
                return res.status(404).send({
                    status: "error",
                    message: getReview.message
                });
            } else if (getReview) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        new_Review: getReview
                    }
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while get the Review."
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
                message: "An error occurred while list the reviews."
            });
        }

    }
   
}