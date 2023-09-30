import { Request, Response } from "express";
import { ListAllReviewsUseCase } from "../../application/listAllReviewsUseCase";



export class ListAllReviewsController {
    constructor(readonly listAllReviewsUseCase : ListAllReviewsUseCase) {}
    async run(req:Request, res:Response) {
        console.log('controller')
        try {
            let listAllReviews = await this.listAllReviewsUseCase.run()

            if(listAllReviews){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        listAllReviews
                    }
                })
            }else{
                return res.status(200).send({
                    status: "ok",
                    message: "reviewa not found"
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "An error occurred while list the reviews."
            });
        }

    }
   
}