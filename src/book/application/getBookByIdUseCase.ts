import { Book } from "../domain/book";
import { IBookRepositorio } from "../domain/bookRepository";


export class GetBookByIdUseCase {
    constructor(readonly bookRepository: IBookRepositorio) {}
    
    async run(
        uuid: string,
    ): Promise<Book | null> {
        
        try {
            const newBook = await this.bookRepository.getBookById(uuid)
            return newBook;
        } catch (error) {
            return null;
        }
    }
}