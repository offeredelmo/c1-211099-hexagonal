import { query } from "../../database/connection";


export async function verifyExistence( uuid_book: string, uuid_user: string): Promise<void> {
    // 1. Verificar si el UUID del usuario existe
    const checkUserSql = `
        SELECT loan_status FROM users WHERE uuid = ?;
    `;
    const [userResults]: any = await query(checkUserSql, [uuid_user]);

    if (userResults.length === 0) {
        throw new Error("The provided user UUID does not match any records.");
    }

    // 2. Verificar si el UUID del libro existe
    const checkBookSql = `
        SELECT loan_status FROM books WHERE uuid = ?;
    `;
    const [bookResults]: any = await query(checkBookSql, [uuid_book]);

    if (bookResults.length === 0) {
        throw new Error("The provided book UUID does not match any records.");
    }
}
