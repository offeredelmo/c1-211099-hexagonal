import { Book } from "../domain/book";
import { IBookRepositorio } from "../domain/bookRepository";


export class ListByFilterUseCase {
    constructor(readonly bookRepository: IBookRepositorio) {}
    
    async run(
        filter:string,
        title?:string,
        author?:string,
        invoice?:string,
        unique_code?:string
    ): Promise<Book[] | null> {
        try {
            const listByFilter = await this.bookRepository.listByFilter(filter,title,author,invoice,unique_code)
            return listByFilter;
        } catch (error) {
            return null;
        }
    }
}