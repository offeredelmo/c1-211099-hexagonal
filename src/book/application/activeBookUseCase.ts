
import { IBookRepositorio } from "../domain/bookRepository";


export class ActivateBookUseCae {
    constructor(readonly bookRepository: IBookRepositorio) {}
    
    async run(
        uuid: string,
    ): Promise<string | null> {
     
        try {
          
            const activeBook = await this.bookRepository.activeBook(uuid)
           
            return activeBook;
        } catch (error) {
            return null;
        }
    }
}