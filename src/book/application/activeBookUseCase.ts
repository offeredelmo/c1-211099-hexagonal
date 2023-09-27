
import { validate } from "class-validator";
import { IBookRepositorio } from "../domain/bookRepository";
import { ValidatorId } from "../domain/validations/books";


export class ActivateBookUseCae {
    constructor(readonly bookRepository: IBookRepositorio) {}
    
    async run(
        uuid: string,
    ): Promise<string | null> {
        let post = new ValidatorId(uuid)
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
          
            const activeBook = await this.bookRepository.activeBook(uuid)
           
            return activeBook;
        } catch (error) {
            return null;
        }
    }
}