import { validate } from "class-validator";
import { Book } from "../domain/book";
import { IBookRepositorio } from "../domain/bookRepository";
import { ValidatorId } from "../domain/validations/books";


export class GetBookByIdUseCase {
    constructor(readonly bookRepository: IBookRepositorio) {}
    
    async run(
        uuid: string,
    ): Promise<Book | null> {
      
        let post = new ValidatorId(uuid)
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        
        try {
            const getBook = await this.bookRepository.getBookById(uuid)
            return getBook;
        } catch (error) {
            return null;
        }
    }
}