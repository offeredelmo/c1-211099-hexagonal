import { validate } from "class-validator";
import { Review } from "../domain/review";
import { IreviewRepository } from "../domain/reviewRepository";
import { ValidateId } from "../domain/validation/review";



export class GetReviewByIdUseCase {
    constructor(readonly ireviewRepository: IreviewRepository) {}
    
    async run(
        uuid:string
    ): Promise<Review | Error> {

        let post = new ValidateId(uuid);
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const listAllActiveUser = await this.ireviewRepository.getReview(uuid)
            return listAllActiveUser;
        } catch (error) {
            return error as Error
        }
    }
}