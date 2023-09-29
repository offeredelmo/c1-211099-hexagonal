import { query } from "../../../database/connection";

export async function isEmailRegistered(email: string) {
    const checkEmailSql = `
        SELECT COUNT(*) as emailCount
        FROM users
        WHERE email = ?;
    `;
    const [emailResults]: any = await query(checkEmailSql, [email]);
    if (emailResults[0].emailCount > 0) {
        throw new Error("El correo electrónico ya está registrado en la base de datos.");
    }
}
