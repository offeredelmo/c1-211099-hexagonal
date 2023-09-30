
import { validate } from "class-validator";
import { IBookRepositorio } from "../domain/bookRepository";
import { ValidatorId } from "../domain/validations/books";


export class DeleteBookUseCase {
    constructor(readonly bookRepository: IBookRepositorio) {}
    
    async run(
        uuid: string,
    ):Promise<string | null> {
        let post = new ValidatorId(uuid)
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        
        try {
            const newBook = await this.bookRepository.deleteBook(uuid,)
            return newBook;
        } catch (error) {
            return null;
        }
    }
}