
import { validate } from "class-validator";
import { Review } from "../domain/review";
import { IreviewRepository } from "../domain/reviewRepository";
import { ValidateUpdate } from "../domain/validation/review";


export class UpdateReviewUseCase {
    constructor(readonly ireviewRepository: IreviewRepository) { }
   
    async run(
        uuid_review: string,
        uuid_user:string,
        review: string,
    ): Promise<Review | null | Error | string>  {
    console.log('usecase')

        const status:boolean = true
        const currentDate: Date = new Date(); //obtiene la fecha  
        const date: string = currentDate.toISOString().split('T')[0];
        let post = new ValidateUpdate(uuid_review,uuid_user,date,review);
        console.log('usecase')

        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        console.log('usecase')

        try {
            console.log('usecase')

            const newBook = await this.ireviewRepository.updateReview(uuid_review,uuid_user,date,review)
            console.log(newBook)
            return newBook;
        } catch (error) {
            console.log(error)
            return (error as Error).message;
        }
    }
}