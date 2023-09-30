import { Loan } from "./loan"

export interface ILoanRepository {
    userLoanBook(
        uuid: string,
        uuid_book: string,
        uuid_user: string,
        loan_date: string,
        dedline: string,
        status: boolean
    ): Promise<Loan | Error | string>//ya quedo
    //el usuario prestara un libro validar que existe el libro, el usuario una vez prestado el statu se le dara una semana para entregar y su estatus estara activo y lo que significa que no a regresado el libro, una vez que lo regrese su estatus cambiara a activo, tampoco el usuario podra prestar otro libro asta que el estatus de su prestamo sea false osea que ya lo devolvio o con el loan_status de cada quien
    returnLoan(
        uuid:string
    ):Promise<string | Error>

    listAllLoans():Promise<Loan[] |  Error>//listo
}