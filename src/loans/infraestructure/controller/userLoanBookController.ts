import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { UserLoanBookUseCase } from "../../application/userLoanBookUseCase";


export class UserLoanBookController {

    constructor(readonly userLoanBookUseCase: UserLoanBookUseCase) { }

    async run(req: Request, res: Response) {
        try {

            let {
                uuid_book,
                uuid_user,
            } = req.body;

            // Castear el archivo a UploadedFile (express-fileupload)

            const miuuid: string = uuid();
            const status: boolean = true;
            const currentDate: Date = new Date(); //obtiene la fecha  
            console.log(currentDate)

            const loan_date: string = currentDate.toISOString().split('T')[0]; // se adapta a tipo date de mysql
            console.log(loan_date)
            currentDate.setDate(currentDate.getDate() + 6); //se dan 6 dias para regresarlo despues del prestamo 

            const dedline: string = currentDate.toISOString().split('T')[0]; // se adapta a tipo date de mysql
            console.log(dedline)
            

            let newLoan = await this.userLoanBookUseCase.run(miuuid, uuid_book, uuid_user,loan_date,dedline,status);
            if (newLoan instanceof Error) {
                return res.status(400).send({
                    status: "error",
                    message: newLoan.message
                });
            } else if (newLoan) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        new_Book: newLoan
                    }
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while adding loan book."
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
                message: "An error occurred while adding the book."
            });
        }
    }
}