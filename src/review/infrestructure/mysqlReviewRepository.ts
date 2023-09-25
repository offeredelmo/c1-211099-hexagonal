import { query } from "../../database/connection";
import { Review } from "../domain/review";
import { IreviewRepository } from "../domain/reviewRepository";

export class MysqlReviewRepository implements IreviewRepository {
    async addReview(uuid: string, uuid_user: string, uuid_book: string, date: string, review: string): Promise<Review | null> {
        try {
            const sql = `
                INSERT INTO Reviews (uuid, uuid_book, uuid_user, date, review)
                VALUES (?, ?, ?, ?, ?);
            `;
            const values = [uuid, uuid_book, uuid_user, date, review];
            
            const centencia = await query(sql, values);
            if (centencia == null) {
                return null
            }
    
            // Devuelve la review recién añadida
            const newReview: Review = new Review(uuid, uuid_user, uuid_book, date, review);
            return newReview;
    
        } catch (error) {
            console.error("Error adding review:", error);
            return null;
        }
    }
    
}