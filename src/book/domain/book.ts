export class Book {
    constructor(
       public uuid: string,
       public title: string,
       public author: string,
       public description: string,
       public invoice: string,
       public unique_code: string,
       public img_url: string,
       public loan_status: boolean
    ){}
    
}