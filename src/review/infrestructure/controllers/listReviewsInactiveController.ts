import { Request, Response } from "express";
import { ListReviewsInactiveUseCase } from "../../application/listReviewsInactive";



export class ListReviewsInactiveController {
    constructor(readonly listReviewsInactiveUseCase : ListReviewsInactiveUseCase) {}
    async run(req:Request, res:Response) {
        try {
            let listReviewsInactive = await this.listReviewsInactiveUseCase.run()

            if(listReviewsInactive){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        listReviewsInactive
                    }
                })
            }else{
                return res.status(404).send({
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