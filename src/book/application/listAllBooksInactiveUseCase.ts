import { Book } from "../domain/book";
import { IBookRepositorio } from "../domain/bookRepository";


export class ListAllBooksInactiveUseCase {
    constructor(readonly bookRepository: IBookRepositorio) {}
    
    async run(
       
    ): Promise<Book[] | null> {
        
        try {
            const listAllBooksInactive = await this.bookRepository.listAllBooksInactive()
            return listAllBooksInactive;
        } catch (error) {
            return null;
        }
    }
}