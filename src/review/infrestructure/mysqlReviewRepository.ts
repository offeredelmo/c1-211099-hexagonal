import { query } from "../../database/connection";
import { Review } from "../domain/review";
import { IreviewRepository } from "../domain/reviewRepository";
import { validateReviewConditions, validateReviewExist, validateUserExist } from "./validation/reviewmysql";

export class MysqlReviewRepository implements IreviewRepository {



    async addReview(uuid: string, uuid_user: string, uuid_book: string, date: string, review: string, status: boolean): Promise<Review | null | Error | string> {
        console.log('mysql')

        try {

            let validationResult = await validateReviewConditions(uuid_user, uuid_book);
            console.log(typeof validationResult);
            if (typeof validationResult === "string") {
                console.log("activada la validacion");
                return validationResult;
            }

            //paso3: agregar reseña despues de haber pasado las condiciones 
            const sql = `
                INSERT INTO Reviews (uuid, uuid_book, uuid_user, date, review, status)
                VALUES (?, ?, ?, ?, ?, ?);
            `;
            const values = [uuid, uuid_book, uuid_user, date, review, status];


            const centencia = await query(sql, values);//esto si funciona
            if (centencia == null) {
                return ("ya realizaste una review para este libro .");
            }

            // Devuelve la review recién añadida
            const newReview: Review = new Review(uuid, uuid_user, uuid_book, date, review, status);
            console.log(newReview)

            return newReview;

        } catch (error) {
            console.error("Error adding review:", error);
            return error as Error
        }
    }

    async listAllReview(): Promise<Review[] | null> {
        try {
            // 1. Consulta SQL para obtener todas las reviews
            const sql = "SELECT * FROM reviews;";
            const [rows]: any = await query(sql);

            if (!Array.isArray(rows)) {
                throw new Error('Rows is not an array');
            }

            // 2. Convertir los resultados en una lista de objetos Review
            const reviews: Review[] = rows.map(row => new Review(
                row.uuid,
                row.uuid_user,
                row.uuid_book,
                row.date,
                row.review,
                row.status
            ));

            return reviews;

        } catch (error) {
            console.error("Error al obtener todas las reviews:", error);
            return null;
        }
    }

    async listReviewsByUser(uuid: string): Promise<Review[] | string | Error> {
        try {
            await validateUserExist(uuid)
            // 1. Consulta SQL para obtener todas las reviews de un usuario específico
            const sql = "SELECT * FROM reviews WHERE uuid_user = ?;";
            const [rows]: any = await query(sql, [uuid]);

            if (!Array.isArray(rows) || rows.length === 0) {
                return []; // Puedes retornar un array vacío si no hay reviews para ese usuario.
            }

            // 2. Convertir los resultados en una lista de objetos Review
            const reviews: Review[] = rows.map(row => new Review(
                row.uuid,
                row.uuid_user,
                row.uuid_book,
                row.date,
                row.review,
                row.status
            ));

            return reviews;

        } catch (error) {
            console.error("Error adding review:", error);
            return error as Error
        }
    }

    async getReview(uuid: string): Promise<Review | Error> {
        try {
            await validateReviewExist(uuid)


            // 1. Consulta SQL para obtener la review con el UUID específico
            const sql = "SELECT * FROM reviews WHERE uuid = ?;";
            const [rows]: any = await query(sql, [uuid]);

            // Tomar la primera fila como resultado (debido a que UUID es único, solo deberíamos tener un resultado)
            const row = rows[0];

            // 2. Convertir el resultado en un objeto Review
            const review: Review = new Review(
                row.uuid,
                row.uuid_user,
                row.uuid_book,
                row.date,
                row.review,
                row.status
            );

            return review;

        } catch (error) {
            console.error("Error adding review:", error);
            return error as Error
        }
    }

    async listReviewsInactive(): Promise<Review[] | null> {
        try {
            // Consulta SQL para obtener todas las reviews con status = FALSE
            const sql = "SELECT * FROM reviews WHERE status = 0;";
            const [rows]: any = await query(sql);

            // Si no hay resultados o no es un array, se retorna null
            if (!Array.isArray(rows) || rows.length === 0) {
                return null;
            }

            // Convertir los resultados en una lista de objetos Review
            const reviews: Review[] = rows.map(row => new Review(row.uuid, row.uuid_user, row.uuid_book, row.date, row.review, row.status));
            return reviews;

        } catch (error) {
            console.error("Error al obtener las reviews inactivas:", error);
            return null;
        }
    }

    async deleteReview(uuid_review: string, uuid_user: string): Promise<string | Error | null> {
        try {
            await validateReviewExist(uuid_review)
            await validateUserExist(uuid_user)

            // Paso 1: Verificar que el usuario es el propietario de la review
            const validationSql = "SELECT uuid_user FROM reviews WHERE uuid = ?;";
            const [validationResults]: any = await query(validationSql, [uuid_review]);

            if (validationResults.length === 0) {
                throw new Error("No se encontró la review con el UUID proporcionado.");
            }

            if (validationResults[0].uuid_user !== uuid_user) {
                return ('unauthorized')
            }

            // Paso 2: Eliminar la review
            const sql = "DELETE FROM reviews WHERE uuid = ?;";
            const result: any = await query(sql, [uuid_review]);

            // Verificamos si se eliminó alguna fila
            if (result.affectedRows === 0) {
                throw new Error("No se encontró la review con el UUID proporcionado.");
            }

            return "Review eliminada exitosamente.";

        } catch (error) {
            console.error("Error adding review:", error);
            return error as Error
        }
    }

    async updateReview(uuid_review: string, uuid_user: string, date: string, review: string): Promise<Review | Error | string> {
        try {
            await validateReviewExist(uuid_review)
            await validateUserExist(uuid_user)
            // 1. Comprobar si la revisión pertenece al usuario
            const checkOwnershipSql = `
                SELECT COUNT(*) as count
                FROM reviews
                WHERE uuid = ? AND uuid_user = ?;
            `;
            const [ownershipResults]: any = await query(checkOwnershipSql, [uuid_review, uuid_user]);
            if (ownershipResults[0].count === 0) {
                return ('unauthorized')
            }

            // 2. Actualizar la revisión
            const updateSql = `
                UPDATE reviews 
                SET date = ?, review = ? 
                WHERE uuid = ?;
            `;
            await query(updateSql, [date, review, uuid_review]);

            // 3. Obtener la revisión actualizada para devolverla
            const getUpdatedReviewSql = `
                SELECT * 
                FROM reviews
                WHERE uuid = ?;
            `;
            const [updatedReviewResults]: any = await query(getUpdatedReviewSql, [uuid_review]);

            // Convertir el resultado en un objeto Review y devolverlo
            const updatedReview: Review = new Review(
                updatedReviewResults[0].uuid,
                updatedReviewResults[0].uuid_user,
                updatedReviewResults[0].uuid_book,
                updatedReviewResults[0].date,
                updatedReviewResults[0].review,
                updatedReviewResults[0].status
            );

            return updatedReview;

        } catch (error) {
            console.error("Error adding review:", error);
            return error as Error
        }
    }

    async inactiveReview(uuid_review: string): Promise<string | null> {
        try {
            // SQL statement to set status to false for the specified review
            const updateReviewStatusSql = `
                UPDATE reviews 
                SET status = FALSE
                WHERE uuid = ?;
            `;

            const [result]: any = await query(updateReviewStatusSql, [uuid_review]);

            if (result.affectedRows === 0) {
                // No rows were updated, which means the UUID was not found
                return null;
            }

            return "Review status set to inactive successfully.";

        } catch (error) {
            console.error("Error inactivating review:", error);
            throw new Error("Failed to set the review status to inactive.");
        }
    }

    async activateReview(uuid_review: string): Promise<string | null> {
        try {
            // SQL statement to set status to false for the specified review
            const updateReviewStatusSql = `
                UPDATE reviews 
                SET status = TRUE
                WHERE uuid = ?;
            `;

            const [result]: any = await query(updateReviewStatusSql, [uuid_review]);

            if (result.affectedRows === 0) {
                // No rows were updated, which means the UUID was not found
                return null;
            }

            return "Review status set to activate successfully.";

        } catch (error) {
            console.error("Error inactivating review:", error);
            throw new Error("Failed to set the review status to inactive.");
        }
    }


}