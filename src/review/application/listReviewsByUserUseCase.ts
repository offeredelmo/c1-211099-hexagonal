import { validate } from "class-validator";
import { Review } from "../domain/review";
import { IreviewRepository } from "../domain/reviewRepository";
import { ValidateId } from "../domain/validation/review";



export class ListReviewByUserUseCase {
    constructor(readonly ireviewRepository: IreviewRepository) {}
    
    async run(
        uuid:string
    ): Promise<Review[]  | string | Error> {

        let post = new ValidateId(uuid);
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const listAllActiveUser = await this.ireviewRepository.listReviewsByUser(uuid)
            return listAllActiveUser;
        } catch (error) {
            return error as Error
        }
    }
}