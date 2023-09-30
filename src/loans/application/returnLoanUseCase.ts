import { validate } from "class-validator";
import { Loan } from "../domain/loan";
import { ValidationId } from "../domain/validations/loan";
import { ILoanRepository } from "../domain/loanRepository";


export class ReturnLoanUseCase {
    constructor(readonly loanRepository: ILoanRepository) {}
    
    async run(
        uuid: string,
     
    ): Promise<Loan | string | Error>  {
        let post = new ValidationId(uuid)
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const returnLoan = await this.loanRepository.returnLoan(uuid)
            return returnLoan;
        } catch (error) {
            console.log(error)
            return (error as Error).message;
        }
    }
}