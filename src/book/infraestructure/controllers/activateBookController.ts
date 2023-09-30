import { Request, Response } from "express";
import { ActivateBookUseCae } from "../../application/activeBookUseCase";




export class ActivateBookController {
    constructor(readonly ActivateBookUseCae : ActivateBookUseCae) {}
    async run(req:Request, res:Response) {
        try {
            let {
                uuid,
            } = req.body
        
            let activateBook = await this.ActivateBookUseCae.run(uuid)

            if(activateBook){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        activateBook
                    }
                })
            }
            if (activateBook == null) {
                return res.status(404).send({
                    status: "error",
                    message: "Book not found."
                });
            }
            
        }  catch (error) {
            if (error instanceof Error) {
                if (error.message.startsWith('[')) {
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)
                    });
                }
            } 
            console.error("Error en ActivateBookController:", error);
            return res.status(500).send({
                status: "error",
                message: "An error occurred while activating the user."
            });
        }
        
    }
}