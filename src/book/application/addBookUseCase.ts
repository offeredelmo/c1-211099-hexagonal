import { validate } from "class-validator";
import { Book } from "../domain/book";
import { IBookRepositorio } from "../domain/bookRepository";
import { ValidationCreateBook } from "../domain/validations/books";


export class AddBookUseCase {
    constructor(readonly bookRepository: IBookRepositorio) {}
    
    async run(
        uuid: string,
        title: string,
        author: string,
        description: string,
        invoice: string,
        unique_code: string,
        img_url: string,
        loan_status: boolean,
    ): Promise<Book | null> {
        let post = new ValidationCreateBook(uuid,title,author,description,invoice,unique_code,img_url,loan_status)
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const newBook = await this.bookRepository.addBook(
                uuid,
                title,
                author,
                description,
                invoice,
                unique_code,
                img_url,
                loan_status,
            )
            
            return newBook;
        } catch (error) {
            return null;
        }
    }
}