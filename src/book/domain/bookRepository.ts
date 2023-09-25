
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
        title: string,
        author: string,
        description: string,
    ): Promise<Book | null>;

    deleteBook(uuid:string):Promise<string | null>

    getBookById(uuid:string):Promise<Book | null>

    // listBookByAttribute(attribute: string): Promise<Book[] | null>//posiblemente cambiarlo a int 1:titulo 2: autor 3: folio
    // getBookById(id: number): Promise<Book | null>;


    // updateBook(id: string, book: Book): Promise<void>;
    // deleteUser(id: string): Promise<void>;
    // activateBook(onOff: boolean): Promise<void>;
}
