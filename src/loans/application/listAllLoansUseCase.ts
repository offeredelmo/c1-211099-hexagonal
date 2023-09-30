
import { Loan } from "../domain/loan";
import { ILoanRepository } from "../domain/loanRepository";


export class ListAllLoansUseCase {
    constructor(readonly loanRepository: ILoanRepository) {}
    
    async run(): Promise<Loan[] | string | Error>  {
        try {
            const returnLoan = await this.loanRepository.listAllLoans()
            return returnLoan;
        } catch (error) {
            console.log(error)
            return (error as Error).message;
        }
    }
}2