import { Review } from "../domain/review";
import { IreviewRepository } from "../domain/reviewRepository";



export class ListReviewsInactiveUseCase {
    constructor(readonly ireviewRepository: IreviewRepository) {}
    
    async run(): Promise<Review[] | null> {
        try {
            const listReviewsInactive = await this.ireviewRepository.listReviewsInactive()
            return listReviewsInactive;
        } catch (error) {
            return null;
        }
    }
}