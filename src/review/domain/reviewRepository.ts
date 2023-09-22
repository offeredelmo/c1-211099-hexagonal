import { Review } from "./review";

export interface reviewRepository{
    listAllReviews(): Promise<Review[] | null>
    listAllReviewaInactive(status: boolean ): Promise<Review[] | null>
    listreviewsByUser(id: string): Promise<Review[] | null>//posiblemente cambiarlo a int 1:titulo 2: autor 3: folio
    getReviewById(id:string): Promise<Review | null>;
    addReview(review: Review  ): Promise<void>;
    updateReview(id: string, review: Review): Promise<void>;
    deleteReview(id: string):  Promise<void>;
    activateReview(onOff: boolean ):  Promise<void>;
}