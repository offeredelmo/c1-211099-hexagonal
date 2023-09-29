import { Review } from "./review";

export interface IreviewRepository {
   addReview(
      uuid: string,
      id_user: string,
      id_book: string,
      date: string,
      review: string,
      status: boolean
   ): Promise<Review | null | Error | string>

   listAllReview(): Promise<Review[] | null>

   listReviewsByUser(uuid:string):Promise<Review[] | string>

   getReview(uuid:string):Promise<Review | string | null>

   listReviewsInactive():Promise<Review[] | null>

   deleteReview(uuid_review:string,uuid_user:string):Promise<string | Error>

   updateReview(uuid_review:string,uuid_user:string,date: string, review:string,):Promise<Review| Error | string >
}