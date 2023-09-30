
import { Book } from './book';

export interface IBookRepositorio {
    addBook(//listo
        uuid: string,
        title: string,
        author: string,
        description: string,
        invoice: string,
        unique_code: string,
        img_uer: string,
        loan_status: boolean,
    ): Promise<Book | null>

    listAllBooks(): Promise<Book[] | null>//listo

    listAllBooksInactive(): Promise<Book[] | null>//listo (los que no estan prestados)

    updateBook(//listo
        uuid:string,
        title?: string,
        author?: string,
        description?: string,
    ): Promise<Book | null>;

    deleteBook(uuid:string):Promise<string | null> //listo

    getBookById(uuid:string):Promise<Book | null> //listo

    activeBook(uuid:string):Promise<string | null> //en desuso ya que prestamo hace la funcion de devolver

    listByFilter( //listo
        filter:string,
        title?:string,
        author?:string,
        invoice?:string,
        unique_code?:string
        ):Promise<Book[] | null>

    listIfReview():Promise<Book[] | null>//pendiente de comprobar su funcionamiento
}
