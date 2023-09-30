import { Review } from "../domain/review";
import { IreviewRepository } from "../domain/reviewRepository";



export class ListAllReviewsUseCase {
    constructor(readonly ireviewRepository: IreviewRepository) {}
    
    async run(): Promise<Review[] | null> {
        try {
            const listAllActiveUser = await this.ireviewRepository.listAllReview()
            return listAllActiveUser;
        } catch (error) {
            return null;
        }
    }
}