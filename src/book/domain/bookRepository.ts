
import { Book } from './book';

export interface ILibroRepositorio {
    listAllBooks(): Promise<Book[] | null>
    listAllBooksInactive(status: boolean ): Promise<Book[] | null>
    listBookByAttribute(attribute: string): Promise<Book[] | null>//posiblemente cambiarlo a int 1:titulo 2: autor 3: folio
    getBookById(id:number): Promise<Book | null>;
    addBook(book: Book): Promise<void>;
    updateBook(book: Book): Promise<void>;
    updateBook(id: string, book: Book): Promise<void>;
    deleteUser(id: string):  Promise<void>;
    activateBook(onOff: boolean ):  Promise<void>;
}
