export class Loan {
    constructor(
        public uuid: string,
        public uuid_book: string,
        public uuid_user: string,
        public loan_date: string,
        public dedline: string,
        public status: boolean
    ) {
        
    }
}