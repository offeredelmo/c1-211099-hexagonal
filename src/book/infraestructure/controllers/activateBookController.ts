import { Request, Response } from "express";
import { ActivateBookUseCae } from "../../application/activeBookUseCase";




export class ActivateBookController {
    constructor(readonly ActivateBookUseCae : ActivateBookUseCae) {}
    async run(req:Request, res:Response) {
        try {
            let {
                uuid,
            } = req.body
        
            let activateUser = await this.ActivateBookUseCae.run(uuid)

            if(activateUser){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        activateUser
                    }
                })
            }
            if (activateUser == null) {
                return res.status(404).send({
                    status: "error",
                    message: "Book not found."
                });
            }
            
        }  catch (error) {
            console.error("Error en ActivateBookController:", error);
            return res.status(500).send({
                status: "error",
                message: "An error occurred while activating the user."
            });
        }
        
    }
}