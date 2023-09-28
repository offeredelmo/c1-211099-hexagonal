import { Request, Response } from "express";
import { ListAllLoansUseCase } from "../../application/listAllLoansUseCase";


export class ListAllLoansController {

    constructor(readonly listAllLoansUseCase: ListAllLoansUseCase) { }

    async run(req: Request, res: Response) {
        try {

           
            let newLoan = await this.listAllLoansUseCase.run();
            console.log(newLoan)
            if (newLoan instanceof Error) {
                return res.status(400).send({
                    status: "error",
                    message: newLoan.message
                });
            } else if (newLoan) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        Loans: newLoan
                    }
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while returning the loan book."
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "An unexpected error occurred while returning the loan book."
            });
        }
    }
}