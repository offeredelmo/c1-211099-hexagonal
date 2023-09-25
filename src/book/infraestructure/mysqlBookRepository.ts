import { query } from "../../database/connection";
import { Book } from "../domain/book";
import { IBookRepositorio } from "../domain/bookRepository";


export class MysqlBookRepository implements IBookRepositorio {
   
    async addBook(id: string, title: string, author: string, description: string, invoice: string, unique_code: string, img_url: string, loan_status: boolean): Promise<Book | null> {
        try {
            const sql = `
                INSERT INTO books (id, title, author, description, invoice, unique_code, img_uer, loan_status)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);
            `;
            const values = [id, title, author, description, invoice, unique_code, img_url, loan_status];
            // Devuelve el libro recién añadido
            const newBook:Book = new Book(id, title, author, description, invoice, unique_code, img_url, loan_status)
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
            const checkSql = "SELECT * FROM books WHERE id = ?";
            const [existingBooks]: any = await query(checkSql, [uuid]);
    
            if (!Array.isArray(existingBooks) || existingBooks.length === 0) {
                console.log('no encontrado pa')
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
    
            const sql = `UPDATE books SET ${updates.join(", ")} WHERE id = ?`;
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
            console.log(uuid)
            const checkSql = "SELECT * FROM books WHERE id = ?";
            const [existingBooks]: any = await query(checkSql, [uuid]);
    
            // Si no hay registros que coincidan, regresamos null indicando que el libro no fue encontrado
            if (!Array.isArray(existingBooks) || existingBooks.length === 0) {
                return null;  
            }
    
            // Si el libro existe, procedemos a eliminarlo
            const sql = "DELETE FROM books WHERE id = ?";
            await query(sql, [uuid]);
    
            // Si la eliminación fue exitosa, regresamos un mensaje de éxito
            return `Book with UUID ${uuid} was successfully deleted.`;
    
        } catch (error) {
            console.error('Error al eliminar el libro:', error);
            return null;
        }
    }
    

    async getBookById(uuid: string): Promise<Book | null> {
        try {
            const sql = "SELECT * FROM books WHERE id = ?";
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
    
    
   
    

}

