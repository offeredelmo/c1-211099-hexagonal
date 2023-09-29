import { Request, Response } from "express";
import { InactivateReviewUseCase } from "../../application/inactiveReviewUseCase";
import { ActivateReviewUseCase } from "../../application/activateReviewUseCase";




export class ActivateReviewController {
    constructor(readonly activateReviewUseCase : ActivateReviewUseCase) {}
    async run(req:Request, res:Response) {
        try {
            let {
                uuid,
            } = req.body
        
            let activateReview = await this.activateReviewUseCase.run(uuid)

            if(activateReview){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        activateReview
                    }
                })
            }
            if (!activateReview) {
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