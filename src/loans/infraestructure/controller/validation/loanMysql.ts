import { query } from "../../../../database/connection";



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


export async function validatebook(uuid_book:string) {
    const checkIfUserExistsSql = `
    SELECT COUNT(*) as bookCount
    FROM books
    WHERE uuid = ?;
`;
   const [userResults]: any = await query(checkIfUserExistsSql, [uuid_book]);
   if (userResults[0].bookCount === 0) {
       throw new Error("book not fount");
   }
}
