import { validate } from "class-validator";
import { IreviewRepository } from "../domain/reviewRepository";
import { ValidateIds } from "../domain/validation/review";



export class DeleteReviewUseCase {
    constructor(readonly ireviewRepository: IreviewRepository) {}
    
    async run(
        uuid_review:string,
        uuid_user:string
    ): Promise<string | Error | null> {

        let post = new ValidateIds(uuid_review,uuid_user);
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const DeleteReview = await this.ireviewRepository.deleteReview(uuid_review,uuid_user)
            return DeleteReview;
        } catch (error) {
            return error as Error
        }
    }
}