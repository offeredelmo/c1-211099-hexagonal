import { Loan } from "./loan";

export interface LoanRepository {
    userLoanBook(loan: Loan): Promise<void>
    
}