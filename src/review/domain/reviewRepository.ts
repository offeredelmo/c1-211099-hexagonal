import { Review } from "./review";

export interface IreviewRepository{
   addReview(
        uuid: string,
        id_user: string,
        id_book: string,
        date: string,
        review:string  
   ):Promise<Review | null>
}