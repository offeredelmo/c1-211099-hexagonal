import { Review } from "./review";

export interface IreviewRepository {
   addReview(
      uuid: string,
      id_user: string,
      id_book: string,
      date: string,
      review: string,
      status: boolean
   ): Promise<Review | null | Error | string>//listo

   listAllReview(): Promise<Review[] | null>//listo

   listReviewsByUser(uuid:string):Promise<Review[] | string | Error>//listo

   getReview(uuid:string):Promise<Review | Error>//listo

   listReviewsInactive():Promise<Review[] | null>//listo

   deleteReview(uuid_review:string,uuid_user:string):Promise<string | Error | null>

   updateReview(uuid_review:string,uuid_user:string,date: string, review:string,):Promise<Review| Error | string >

   inactiveReview(uuid_review:string):Promise<string | null >
   
   activateReview(uuid_review:string):Promise<string | null >

}