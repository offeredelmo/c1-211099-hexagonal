import { validate } from "class-validator";
import { ValidateId } from "../domain/validation/review";
import { IreviewRepository } from "../domain/reviewRepository";


export class ActivateReviewUseCase {
    constructor(readonly ireviewRepository: IreviewRepository) {}

    async run(uuid_review:string):Promise<string | null>{

        let post = new ValidateId(uuid_review)
        const validation = await validate(post)
        console.log(validation.length)

        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const activateReview = await this.ireviewRepository.activateReview(uuid_review);
            return activateReview;
        } catch (error) {
            return null;
        }
    }
}