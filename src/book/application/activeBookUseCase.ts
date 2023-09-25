
import { IBookRepositorio } from "../domain/bookRepository";


export class ActivateBookUseCae {
    constructor(readonly bookRepository: IBookRepositorio) {}
    
    async run(
        uuid: string,
    ): Promise<string | null> {
        console.log('hojo')
        try {
            console.log('hojo')
            const activeBook = await this.bookRepository.activeBook(uuid)
            console.log('hojo')
            return activeBook;
        } catch (error) {
            return null;
        }
    }
}