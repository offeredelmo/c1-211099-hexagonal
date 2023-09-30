
import { validate } from "class-validator";
import { Review } from "../domain/review";
import { IreviewRepository } from "../domain/reviewRepository";
import { ValidatorCreateReview } from "../domain/validation/review";


export class AddReviewUseCase {
    constructor(readonly ireviewRepository: IreviewRepository) { }
   
    async run(
        uuid: string,
        uuid_user: string,
        uuid_book: string,
        data:string,
        review: string,
    ): Promise<Review | null | Error | string>  {
    console.log('usecase')

        const status:boolean = true
        const currentDate: Date = new Date(); //obtiene la fecha  
        const date: string = currentDate.toISOString().split('T')[0];
        let post = new ValidatorCreateReview(uuid,uuid_user,uuid_book,date,review,status);
        console.log('usecase')

        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        console.log('usecase')

        try {
            console.log('usecase')

            const newBook = await this.ireviewRepository.addReview(uuid, uuid_user, uuid_book, date, review, status)
            console.log(newBook)
            return newBook;
        } catch (error) {
            console.log(error)
            return (error as Error).message;
        }
    }
}