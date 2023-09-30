import { defineAssociation } from "@sequelize/core/types/associations/helpers";
import { query } from "../../database/connection";
import { Loan } from "../domain/loan";
import { ILoanRepository } from "../domain/loanRepository";
import { validateUserExist, validatebook } from "./controller/validation/loanMysql";


export class MysqlLoanRepository implements ILoanRepository {


    async userLoanBook(uuid: string, uuid_book: string, uuid_user: string, loan_date: string, dedline: string, status: boolean): Promise<Loan | Error | string> {

        try {
            await validateUserExist(uuid_user)
            await validatebook(uuid_book)
            // 1. Verificar el status del usuario o del libro
            const checkLoanStatusSql = `
            SELECT 
                (SELECT loan_status FROM users WHERE uuid = ?) AS user_loan_status, 
                (SELECT loan_status FROM books WHERE uuid = ?) AS book_loan_status;
            `;
            const [results]: any = await query(checkLoanStatusSql, [uuid_user, uuid_book]);
            console.log(results)
            const { user_loan_status, book_loan_status } = results[0];
            console.log(user_loan_status, book_loan_status)
            // Si alguno de los loan_status es TRUE, no se puede proceder con el préstamo.
            if (user_loan_status && book_loan_status) {
                throw new Error("Both the user and the book are not available for loan.");
            }
            if (user_loan_status) {
                throw new Error("The user is not available for loan.");
            }
            if (book_loan_status) {
                throw new Error("The book is not available for loan.");
            }

            // 2. Actualizar loan_status en users y books a TRUE
            const updateUserLoanStatusSql = `
                UPDATE users SET loan_status = TRUE WHERE uuid = ?;
            `;
            await query(updateUserLoanStatusSql, [uuid_user]);

            const updateBookLoanStatusSql = `
                UPDATE books SET loan_status = TRUE WHERE uuid = ?;
            `;
            await query(updateBookLoanStatusSql, [uuid_book]);

            // 3. Insertar el nuevo préstamo en la tabla loans
            const insertLoanSql = `
                INSERT INTO loans (uuid, uuid_book, uuid_user, loan_date, deadline, status) 
                VALUES (?, ?, ?, ?, ?, ?);
            `;
            await query(insertLoanSql, [uuid, uuid_book, uuid_user, loan_date, dedline, status]);

            // Crear y retornar un objeto Loan
            const newLoan: Loan = new Loan(uuid, uuid_book, uuid_user, loan_date, dedline, status);
            return newLoan;

        } catch (error) {
            console.error("Error adding review:", error);
            return error as Error
        }
    }


    async returnLoan(uuid: string): Promise<string | Error> {
        try {
            // 1. Obtener el uuid_user y uuid_book asociados con el préstamo
            const getLoanDetailsSql = `
                SELECT uuid_user, uuid_book FROM loans WHERE uuid = ?;
            `;
            const [loanDetails]: any = await query(getLoanDetailsSql, [uuid]);

            if (!loanDetails || loanDetails.length === 0) {
                throw new Error("Préstamo no encontrado.");
            }

            const { uuid_user, uuid_book } = loanDetails[0];

            // 2. Actualizar loan_status en users y books a FALSE
            const updateUserLoanStatusSql = `
                UPDATE users SET loan_status = FALSE WHERE uuid = ?;
            `;
            await query(updateUserLoanStatusSql, [uuid_user]);

            const updateBookLoanStatusSql = `
                UPDATE books SET loan_status = FALSE WHERE uuid = ?;
            `;
            await query(updateBookLoanStatusSql, [uuid_book]);

            // 3. Actualizar el status del préstamo en la tabla loans a FALSE
            const updateLoanStatusSql = `
                UPDATE loans SET status = FALSE WHERE uuid = ?;
            `;
            await query(updateLoanStatusSql, [uuid]);

            // Retornar un mensaje indicando que el proceso fue exitoso
            return "Préstamo devuelto con éxito.";

        } catch (error) {
            console.error("Error al devolver el libro:", error);
            return error as Error
            return "Ocurrió un error inesperado al devolver el libro.";
        }
    }

    async listAllLoans(): Promise<Loan[] | Error> {
        try {
            // 1. Consulta SQL para obtener todos los préstamos
           
            const sql = "SELECT * FROM loans;";
            const [rows]: any = await query(sql); // Esto probablemente devuelve un tipo de dato más complejo
           
            if (!Array.isArray(rows)) {
                throw new Error('Rows is not an array'); // o maneja este caso como prefieras
            }

            // 2. Convertir los resultados en una lista de objetos Loan
            const loans: Loan[] = rows.map((row => new Loan(row.uuid, row.uuid_book, row.uuid_user, row.loan_date, row.deadline, row.status)));
                console.log(loans[0])
            return loans;

        } catch (error) {
            console.error("Error al obtener todos los préstamos:", error);
            return new Error("Ocurrió un error al obtener todos los préstamos.");
        }
    }
}