import { Book } from "../domain/book";
import { IBookRepositorio } from "../domain/bookRepository";


export class ListIfReviewUseCase {
    constructor(readonly bookRepository: IBookRepositorio) {}
    
    async run(

    ): Promise<Book[] | null> {
        try {
            const listBooksWhitRewview = await this.bookRepository.listIfReview()
            return listBooksWhitRewview;
        } catch (error) {
            return null;
        }
    }
}