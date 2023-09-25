import { Book } from "../domain/book";
import { IBookRepositorio } from "../domain/bookRepository";


export class GetBookByIdUseCase {
    constructor(readonly bookRepository: IBookRepositorio) {}
    
    async run(
        uuid: string,
    ): Promise<Book | null> {
        
        try {
            const getBook = await this.bookRepository.getBookById(uuid)
            return getBook;
        } catch (error) {
            return null;
        }
    }
}