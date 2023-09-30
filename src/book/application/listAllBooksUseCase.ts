import { Book } from "../domain/book";
import { IBookRepositorio } from "../domain/bookRepository";


export class ListAllBookUseCase {
    constructor(readonly bookRepository: IBookRepositorio) {}
    
    async run(): Promise<Book[] | null> {
        try {
            const listAllActiveUser = await this.bookRepository.listAllBooks()
            return listAllActiveUser;
        } catch (error) {
            return null;
        }
    }
}