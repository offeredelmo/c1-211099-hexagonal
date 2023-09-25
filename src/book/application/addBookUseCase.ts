import { Book } from "../domain/book";
import { IBookRepositorio } from "../domain/bookRepository";


export class AddBookUseCase {
    constructor(readonly bookRepository: IBookRepositorio) {}
    
    async run(
        id: string,
        title: string,
        author: string,
        description: string,
        invoice: string,
        unique_code: string,
        img_url: string,
        loan_status: boolean,
    ): Promise<Book | null> {
        
        try {
            const newBook = await this.bookRepository.addBook(
                id,
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