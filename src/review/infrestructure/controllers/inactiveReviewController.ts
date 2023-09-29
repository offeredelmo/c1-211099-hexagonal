import { Request, Response } from "express";
import { InactivateReviewUseCase } from "../../application/inactiveReviewUseCase";




export class InactivationReviewController {
    constructor(readonly inactivateReviewUseCase : InactivateReviewUseCase) {}
    async run(req:Request, res:Response) {
        try {
            let {
                uuid,
            } = req.body
        
            let inactivateReview = await this.inactivateReviewUseCase.run(uuid)

            if(inactivateReview){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        inactivateReview
                    }
                })
            }
            if (!inactivateReview) {
                return res.status(404).send({
                    status: "error",
                    message: "review not found"
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
                message: "An error occurred while activating the user."
            });
        }
    }
}