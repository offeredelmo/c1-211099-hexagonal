import { Request, Response } from "express";
import { ListIfReviewUseCase } from "../../application/listIfReviewUseCase";



export class ListIfReviewController {
    constructor(readonly listByFilterUseCase : ListIfReviewUseCase) {}
    async run(req:Request, res:Response) {
        try {
            let listIfReview = await this.listByFilterUseCase.run()

            if(listIfReview){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        list: listIfReview
                    }
                })
            }else{
                return res.status(404).send({
                    status: "ok",
                    message: "Books not found"
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "An error occurred while list the books."
            });
        }

    }
}