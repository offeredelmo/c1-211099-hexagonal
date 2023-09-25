import { Book } from "../domain/book";
import { IBookRepositorio } from "../domain/bookRepository";


export class UpdateBookUseCase {
    constructor(readonly bookRepository: IBookRepositorio) {}
    
    async run(
        uuid: string,
        title: string,
        author: string,
        description:string
    ): Promise<Book | null> {
        
        try {
            const newBook = await this.bookRepository.updateBook(
                uuid,
                title,
                author,
                description
            )
            return newBook;
        } catch (error) {
            return null;
        }
    }
}