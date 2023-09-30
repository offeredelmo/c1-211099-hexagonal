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
        throw new Error("user not found");
    }

    // Verificar si el uuid_book existe
    const checkIfBookExistsSql = `
     SELECT COUNT(*) as bookCount
     FROM books
     WHERE uuid = ?;
 `;
    const [bookResults]: any = await query(checkIfBookExistsSql, [uuid_book]);
    if (bookResults[0].bookCount === 0) {
        throw new Error("book not found");
    }

    // Verificar si el usuario ha prestado el libro alguna vez
    const checkIfBorrowedSql = `
     SELECT COUNT(*) as count
     FROM loans
     WHERE uuid_user = ? AND uuid_book = ?;
 `;
    const [borrowedResults]: any = await query(checkIfBorrowedSql, [uuid_user, uuid_book]);
    if (borrowedResults[0].count === 0) {
        console.log("no a prestado libro el usuario")
        return ("El usuario no ha prestado el libro, por lo que no puede hacer una review.");
    }

    // Verificar si el usuario ha devuelto todos los préstamos de ese libro
    const checkIfReturnedSql = `
     SELECT COUNT(*) as count
     FROM loans
     WHERE uuid_user = ? AND uuid_book = ? AND status = TRUE;
 `;
    const [notReturnedResults]: any = await query(checkIfReturnedSql, [uuid_user, uuid_book]);
    if (notReturnedResults[0].count > 0) {
        console.log("no a prestado book al user")

        return("El usuario no ha devuelto el libro, por lo que no puede hacer una revisión.");
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
       throw new Error("user not found");
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
        throw new Error("review not found");
    }
}
