
import { Review } from "../domain/review";
import { IreviewRepository } from "../domain/reviewRepository";


export class AddReviewUseCase {
    constructor(readonly ireviewRepository: IreviewRepository ) {}
    
    async run(
        uuid: string,
        id_user: string,
        id_book: string,
        date: string,
        review:string
    ): Promise<Review | null> {
        
        try {
            const newBook = await this.ireviewRepository.addReview(uuid,id_user,id_book,date,review)
            return newBook;
        } catch (error) {
            return null;
        }
    }
}