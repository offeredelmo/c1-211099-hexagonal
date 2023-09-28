import { validate } from "class-validator";
import { Loan } from "../domain/loan";
import { ValidationUserLoanBook } from "../domain/validations/loan";
import { ILoanRepository } from "../domain/loanRepository";


export class UserLoanBookUseCase {
    constructor(readonly loanRepository: ILoanRepository) {}
    
    async run(
        uuid: string,
        uuid_book: string,
        uuid_user: string,
        loan_date: string,
        dedline: string,
        staus: boolean,
    ): Promise<Loan | string | Error> {
        let post = new ValidationUserLoanBook(uuid,uuid_book,uuid_user,loan_date,dedline,staus)
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const newBook = await this.loanRepository.userLoanBook(
                uuid,
                uuid_book,
                uuid_user,
                loan_date,
                dedline,
                staus
            )
            return newBook;
        } catch (error) {
            console.log(error)
            return (error as Error).message;
        }
    }
}