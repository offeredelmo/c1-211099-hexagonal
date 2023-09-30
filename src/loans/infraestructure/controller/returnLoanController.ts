import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { ReturnLoanUseCase } from "../../application/returnLoanUseCase";


export class ReturnLoanController {

    constructor(readonly returnLoanUseCase: ReturnLoanUseCase) { }

    async run(req: Request, res: Response) {
        try {

            let {
                uuid
            } = req.body;

            // Castear el archivo a UploadedFile (express-fileupload)

            let newLoan = await this.returnLoanUseCase.run(uuid);
            if (newLoan instanceof Error) {
                return res.status(404).send({
                    status: "error",
                    message: newLoan.message
                });
            } else if (newLoan) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        new_Book: newLoan
                    }
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while returning the loan book."
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
                message: "An unexpected error occurred while returning the loan book."
            });
        }
    }
}