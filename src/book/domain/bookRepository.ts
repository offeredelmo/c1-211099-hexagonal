
import { Book } from './book';

export interface IBookRepositorio {
    addBook(
        uuid: string,
        title: string,
        author: string,
        description: string,
        invoice: string,
        unique_code: string,
        img_uer: string,
        loan_status: boolean,
    ): Promise<Book | null>

    listAllBooks(): Promise<Book[] | null>

    listAllBooksInactive(): Promise<Book[] | null>

    updateBook(
        uuid:string,
        title?: string,
        author?: string,
        description?: string,
    ): Promise<Book | null>;

    deleteBook(uuid:string):Promise<string | null> 

    getBookById(uuid:string):Promise<Book | null> 

    activeBook(uuid:string):Promise<string | null> 

    listByFilter(
        filter:string,
        title?:string,
        author?:string,
        invoice?:string,
        unique_code?:string
        ):Promise<Book[] | null>

    listIfReview():Promise<Book[] | null>
}
