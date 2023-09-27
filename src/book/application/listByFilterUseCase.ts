import { validate } from "class-validator";
import { Book } from "../domain/book";
import { IBookRepositorio } from "../domain/bookRepository";
import { ValidatorFilter } from "../domain/validations/books";


export class ListByFilterUseCase {
    constructor(readonly bookRepository: IBookRepositorio) {}
    
    async run(
        filter:string,
        title?:string,
        author?:string,
        invoice?:string,
        unique_code?:string
    ): Promise<Book[] | null> {
        let post = new ValidatorFilter(filter,title,author,invoice,unique_code)
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        
        try {
            const listByFilter = await this.bookRepository.listByFilter(filter,title,author,invoice,unique_code)
            return listByFilter;
        } catch (error) {
            return null;
        }
    }
}