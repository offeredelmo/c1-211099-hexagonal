import { validate } from "class-validator";
import { Book } from "../domain/book";
import { IBookRepositorio } from "../domain/bookRepository";
import { ValidatorUpdate } from "../domain/validations/books";


export class UpdateBookUseCase {
    constructor(readonly bookRepository: IBookRepositorio) {}
    
    async run(
        uuid: string,
        title?: string,
        author?: string,
        description?:string
    ): Promise<Book | null> {

        let post = new ValidatorUpdate(uuid,title,author,description)
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        
        try {
            const newBook = await this.bookRepository.updateBook(
                uuid,
                title,
                author,
                description
            )
            return newBook;
        } catch (error) {
            return null;
        }
    }
}