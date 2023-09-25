import { Book } from "../domain/book";
import { IBookRepositorio } from "../domain/bookRepository";


export class DeleteBookUseCase {
    constructor(readonly bookRepository: IBookRepositorio) {}
    
    async run(
        uuid: string,
    ): Promise<string | null> {
        
        try {
            const newBook = await this.bookRepository.deleteBook(uuid,)
            return newBook;
        } catch (error) {
            return null;
        }
    }
}