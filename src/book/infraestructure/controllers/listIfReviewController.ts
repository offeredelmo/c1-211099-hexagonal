import { Request, Response } from "express";
import { ListIfReviewUseCase } from "../../application/listIfReviewUseCase";



export class ListIfReviewController {
    constructor(readonly listByFilterUseCase : ListIfReviewUseCase) {}
    async run(req:Request, res:Response) {
        try {
            console.log('0aasda')
            let listByFilter = await this.listByFilterUseCase.run()

            if(listByFilter){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        list: listByFilter
                    }
                })
            }else{
                return res.status(200).send({
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