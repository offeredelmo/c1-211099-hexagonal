import { query } from "../../../database/connection";


export async function validateReviewConditions(uuid_user: string, uuid_book: string) {
    // Verificar si el uuid_user existe
    const checkIfUserExistsSql = `
     SELECT COUNT(*) as userCount
     FROM users
     WHERE uuid = ?;
 `;
    const [userResults]: any = await query(checkIfUserExistsSql, [uuid_user]);
    if (userResults[0].userCount === 0) {
        throw new Error("El usuario no existe en la base de datos.");
    }

    // Verificar si el uuid_book existe
    const checkIfBookExistsSql = `
     SELECT COUNT(*) as bookCount
     FROM books
     WHERE uuid = ?;
 `;
    const [bookResults]: any = await query(checkIfBookExistsSql, [uuid_book]);
    if (bookResults[0].bookCount === 0) {
        throw new Error("El libro no existe en la base de datos.");
    }

    // Verificar si el usuario ha prestado el libro alguna vez
    const checkIfBorrowedSql = `
     SELECT COUNT(*) as count
     FROM loans
     WHERE uuid_user = ? AND uuid_book = ?;
 `;
    const [borrowedResults]: any = await query(checkIfBorrowedSql, [uuid_user, uuid_book]);
    if (borrowedResults[0].count === 0) {
        throw new Error("El usuario no ha prestado el libro, por lo que no puede hacer una revisión.");
    }

    // Verificar si el usuario ha devuelto todos los préstamos de ese libro
    const checkIfReturnedSql = `
     SELECT COUNT(*) as count
     FROM loans
     WHERE uuid_user = ? AND uuid_book = ? AND status = TRUE;
 `;
    const [notReturnedResults]: any = await query(checkIfReturnedSql, [uuid_user, uuid_book]);
    if (notReturnedResults[0].count > 0) {
        throw new Error("El usuario no ha devuelto el libro, por lo que no puede hacer una revisión.");
    }
}

export async function validateUserExist(uuid_user:string) {
    const checkIfUserExistsSql = `
    SELECT COUNT(*) as userCount
    FROM users
    WHERE uuid = ?;
`;
   const [userResults]: any = await query(checkIfUserExistsSql, [uuid_user]);
   if (userResults[0].userCount === 0) {
       throw new Error("El usuario no existe en la base de datos.");
   }
}

export async function validateReviewExist(uuid_review:string) {
    const checkIfReviewExistsSql = `
        SELECT COUNT(*) as reviewCount
        FROM reviews
        WHERE uuid = ?;
    `;
    const [reviewResults]: any = await query(checkIfReviewExistsSql, [uuid_review]);
    if (reviewResults[0].reviewCount === 0) {
        throw new Error("La review con el UUID proporcionado no existe en la base de datos.");
    }
}
