import { query } from "../../database/connection";
import { Book } from "../domain/book";
import { IBookRepositorio } from "../domain/bookRepository";


export class MysqlBookRepository implements IBookRepositorio {


    async addBook(uuid: string, title: string, author: string, description: string, invoice: string, unique_code: string, img_url: string, loan_status: boolean): Promise<Book | null> {
        try {
            const sql = `
                INSERT INTO books (uuid, title, author, description, invoice, unique_code, img_url, loan_status)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);
            `;
            const params = [uuid, title, author, description, invoice, unique_code, img_url, loan_status];
            const [result]: any = await query(sql, params);
        
            const newBook: Book = new Book(uuid, title, author, description, invoice, unique_code, img_url, loan_status)
            return newBook

        } catch (error) {
            console.error("Error adding book:", error);
            return null;
        }
    }


    async listAllBooks(): Promise<Book[] | null> {
        try {
            const sql = "SELECT * FROM books"; // Asumiendo que tu tabla se llama 'books'
            const [rows]: any = await query(sql);

            if (!Array.isArray(rows) || rows.length === 0) {
                return null;
            }

            const books: Book[] = rows.map(row => {
                return new Book(
                    row.uuid,
                    row.title,
                    row.author,
                    row.description,
                    row.invoice,
                    row.unique_code,
                    row.img_url,
                    row.loan_status
                );
            });

            return books;

        } catch (error) {
            console.error("Error fetching books:", error);
            return null;
        }
    }

    async listAllBooksInactive(): Promise<Book[] | null> {
        try {
            // Filtra los libros donde loan_status es false
            const sql = "SELECT * FROM books WHERE loan_status = false";
            const [rows]: any = await query(sql);

            if (!Array.isArray(rows) || rows.length === 0) {
                return null;
            }

            const books: Book[] = rows.map(row => {
                return new Book(
                    row.id,
                    row.title,
                    row.author,
                    row.description,
                    row.invoice,
                    row.unique_code,
                    row.img_uer,
                    row.loan_status
                );
            });

            return books;

        } catch (error) {
            console.error('Error al obtener libros inactivos:', error);
            return null;
        }
    }

    async updateBook(uuid: string, title?: string, author?: string, description?: string): Promise<Book | null> {
        try {
            // Verificar si el libro con el uuid proporcionado existe
            const checkSql = "SELECT * FROM books WHERE uuid = ?";
            const [existingBooks]: any = await query(checkSql, [uuid]);

            if (!Array.isArray(existingBooks) || existingBooks.length === 0) {
                return null;  // Libro no encontrado
            }

            // Construir la consulta SQL de actualización dinámicamente
            const updates: string[] = [];
            const values: any[] = [];

            if (title !== undefined) {
                updates.push("title = ?");
                values.push(title);
            }

            if (author !== undefined) {
                updates.push("author = ?");
                values.push(author);
            }

            if (description !== undefined) {
                updates.push("description = ?");
                values.push(description);
            }

            // Si no hay nada para actualizar, regresar el libro existente
            if (updates.length === 0) {
                return new Book(
                    existingBooks[0].id,
                    existingBooks[0].title,
                    existingBooks[0].author,
                    existingBooks[0].description,
                    existingBooks[0].invoice,
                    existingBooks[0].unique_code,
                    existingBooks[0].img_uer,
                    existingBooks[0].loan_status
                );
            }

            const sql = `UPDATE books SET ${updates.join(", ")} WHERE uuid = ?`;
            values.push(uuid);

            await query(sql, values);

            // Devolver el libro actualizado
            const [updatedBooks]: any = await query(checkSql, [uuid]);

            return new Book(
                updatedBooks[0].id,
                updatedBooks[0].title,
                updatedBooks[0].author,
                updatedBooks[0].description,
                updatedBooks[0].invoice,
                updatedBooks[0].unique_code,
                updatedBooks[0].img_uer,
                updatedBooks[0].loan_status
            );

        } catch (error) {
            console.error('Error al actualizar el libro:', error);
            return null;
        }
    }

    async deleteBook(uuid: string): Promise<string | null> {
        try {
            // Primero, verifiquemos si el libro con el uuid proporcionado existe
            const checkSql = "SELECT * FROM books WHERE uuid = ?";
            const [existingBooks]: any = await query(checkSql, [uuid]);

            // Si no hay registros que coincidan, regresamos null indicando que el libro no fue encontrado
            if (!Array.isArray(existingBooks) || existingBooks.length === 0) {
                return null;
            }

            // Si el libro existe, procedemos a eliminarlo
            const sql = "DELETE FROM books WHERE uuid = ?";
            await query(sql, [uuid]);

            // Si la eliminación fue exitosa, regresamos un mensaje de éxito
            return `Book successfully deleted.`;

        } catch (error) {
            console.error('Error al eliminar el libro:', error);
            return null;
        }
    }


    async getBookById(uuid: string): Promise<Book | null> {
        try {
            const sql = "SELECT * FROM books WHERE uuid = ?";
            const [rows]: any = await query(sql, [uuid]);

            // Si no hay registros que coincidan, regresamos null indicando que el libro no fue encontrado
            if (!Array.isArray(rows) || rows.length === 0) {
                return null;
            }

            const row = rows[0]; // Como estamos buscando por ID, sólo debe haber una coincidencia

            const book = new Book(
                row.id,
                row.title,
                row.author,
                row.description,
                row.invoice,
                row.unique_code,
                row.img_uer, // Suponiendo que 'img_uer' es un error tipográfico y debería ser 'img_url' o algo similar
                row.loan_status
            );

            return book;

        } catch (error) {
            console.error('Error al obtener el libro:', error);
            return null;
        }
    }

    async activeBook(uuid: string): Promise<string | null> {
        try {
            const sql = "UPDATE books SET loan_status = true WHERE uuid = ?";
            const result: any = await query(sql, [uuid]);

            if (result.affectedRows > 0) {

                return "Book status updated successfully!";
            } else {
                return null; // Esto indica que ningún libro con ese UUID fue encontrado.
            }
        } catch (error) {
            console.error('Error al actualizar el libro:', error);
            return null;
        }
    }


    async listByFilter(
        filter: string,
        title?: string | undefined,
        author?: string | undefined,
        invoice?: string | undefined,
        unique_code?: string | undefined
    ): Promise<Book[] | null> {
        try {
            let sql: string;
            let value: string | undefined;

            switch (filter) {
                case 'title':
                    if (!title) throw new Error('Title is required when filter is title');
                    sql = 'SELECT * FROM books WHERE title = ?';
                    value = title;
                    break;
                case 'author':
                    if (!author) throw new Error('Author is required when filter is author');
                    sql = 'SELECT * FROM books WHERE author = ?';
                    value = author;
                    break;
                case 'invoice':
                    if (!invoice) throw new Error('Invoice is required when filter is invoice');
                    sql = 'SELECT * FROM books WHERE invoice = ?';
                    value = invoice;
                    break;
                case 'unique_code':
                    if (!unique_code) throw new Error('Unique code is required when filter is unique_code');
                    sql = 'SELECT * FROM books WHERE unique_code = ?';
                    value = unique_code;
                    break;
                default:
                    throw new Error('Invalid filter type');
            }

            const [rows]: any = await query(sql, [value]);
            if (rows.length === 0) {
                return null;
            }        
            return rows.map((row: Book) => new Book(row.uuid, row.title, row.author, row.description, row.invoice, row.unique_code, row.img_url, row.loan_status));

        } catch (error) {
            console.error(error);
            return null;
        }
    }



    async listIfReview(): Promise<Book[] | null> {
        try {
            const sql = `
            SELECT DISTINCT
            b.*
            FROM books b
            JOIN reviews r ON b.uuid = r.uuid_book;
        
                `;
            const [rows]: any = await query(sql);

            if (!Array.isArray(rows) || rows.length === 0) {
                return null;
            }

            const books: Book[] = rows.map(row => {
                return new Book(
                    row.id,
                    row.title,
                    row.author,
                    row.description,
                    row.invoice,
                    row.unique_code,
                    row.img_url,
                    row.loan_status
                );
            });

            return books;

        } catch (error) {
            console.error('Error al obtener los libros con reseñas:', error);
            return null;
        }
    }





}

