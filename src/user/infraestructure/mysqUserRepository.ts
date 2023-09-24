import { query } from "../../databse/connect";
import { User } from "../domain/user";
import { IUsuarioRepository } from "../domain/userRepository";


export class MysqlUserRepository implements IUsuarioRepository {
  
        async registerUser(uuid: string, name: string, last_name: string, phone_number: string, email: string, password: string, loan_status: boolean, status: boolean): Promise<User | null | void> {
        try {
            let sql = "INSERT INTO users(uuid, name, last_name, phone_number , email, password, loan_status,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            const params: any[] = [uuid, name, last_name, phone_number, email, password, loan_status, status];
            const [result]: any = await query(sql, params);
            return new User(uuid, name, last_name, phone_number, email, password, loan_status, status);
        } catch (error) {
            return null;
        }
    }

    async listAllUsers(): Promise<User[] | null> {
        try {
            const sql = "SELECT * FROM users";
            const [rows]: any = await query(sql); // Esto probablemente devuelve un tipo de dato más complejo
            if (!Array.isArray(rows)) {
                throw new Error('Rows is not an array'); // o maneja este caso como prefieras
            }
            const users: User[] = rows.map(row => new User(row.uuid, row.name, row.last_name, row.phone_number, row.email, row.password, row.loan_status, row.status));
            return users
        } catch (error) {
            console.error(error);
            return null; // retornas null o podrías optar por retornar un array vacío dependiendo de tu lógica de negocio
        }
    }

    async listAllUserIactive(): Promise<User[] | null> {
        try {
            const sql = "SELECT * FROM users WHERE status = false"; // SQL modificado para filtrar por status
            const [rows]: any = await query(sql); // Esto probablemente devuelve un tipo de dato más complejo

            if (!Array.isArray(rows)) {
                throw new Error('Rows is not an array'); // o maneja este caso como prefieras
            }

            const users: User[] = rows.map(row => new User(row.uuid, row.name, row.last_name, row.phone_number, row.email, row.password, row.loan_status, row.status));
            return users;
        } catch (error) {
            console.error(error);
            return null; // retornas null o podrías optar por retornar un array vacío dependiendo de tu lógica de negocio
        }
    }

    async getUserByFilter(
        filter: string,
        email?: string | undefined,
        name?: string | undefined,
        phone_number?: string | undefined
    ): Promise<User[] | null> {
        try {
            let sql: string;
            let value: string | undefined;
            switch (filter) {
                case 'email':
                    if (!email) throw new Error('Email is required when filter is email');
                    sql = 'SELECT * FROM users WHERE email = ?'; // Se ha removido LIMIT 1
                    value = email;
                    break;
                case 'name':
                    if (!name) throw new Error('Name is required when filter is name');
                    sql = 'SELECT * FROM users WHERE name = ?'; // Se ha removido LIMIT 1
                    value = name;
                    break;
                case 'phone_number':
                    if (!phone_number) throw new Error('Phone number is required when filter is phone_number');
                    sql = 'SELECT * FROM users WHERE phone_number = ?'; // Se ha removido LIMIT 1
                    value = phone_number;
                    break;
                default:
                    throw new Error('Invalid filter type');
            }

            const [rows]: any = await query(sql, [value]);
            if (!rows || rows.length === 0) return null;

            return rows.map((row: User) => new User(row.uuid, row.name, row.last_name, row.phone_number, row.email, row.password, row.loan_status, row.status));

        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getUserById(uuid: string): Promise<User | null> {
        try {
            const sql = "SELECT * FROM users WHERE uuid = ? LIMIT 1"; // SQL para obtener un usuario por uuid
            const [rows]: any = await query(sql, [uuid]); // Ejecutamos la consulta, pasando el uuid como parámetro

            if (!rows || rows.length === 0) return null; // Si no hay resultados, retornamos null        
            const row = rows[0]; // Tomamos el primer resultado (ya que uuid debería ser único)
            // Retornamos una nueva instancia de User con los datos obtenidos
            return new User(row.uuid, row.name, row.last_name, row.phone_number, row.email, row.password, row.loan_status, row.status);
        } catch (error) {
            console.error(error);
            return null; // En caso de error, retornamos null
        }
    }




    async updateUserById(uuid: string, name?: string, last_name?: string, phone_number?: string, email?: string): Promise<User | null> {
        const updates: { [key: string]: string } = {};
        if (name !== undefined) updates.name = name;
        if (last_name !== undefined) updates.last_name = last_name;
        if (phone_number !== undefined) updates.phone_number = phone_number;
        if (email !== undefined) updates.email = email;

        const keys = Object.keys(updates);
        if (keys.length === 0) return null; // No hay nada que actualizar.

        const sqlParts = keys.map(key => `${key} = ?`);
        const sql = `UPDATE users SET ${sqlParts.join(', ')} WHERE uuid = ?`;

        try {
            const values = keys.map(key => updates[key]);
            values.push(uuid); // Añade el UUID al final del array de valores.
            await query(sql, values); // Ejecuta la consulta SQL.

            const [updatedRows]: any = await query('SELECT * FROM users WHERE uuid = ?', [uuid]);
            if (updatedRows.length === 0) return null;

            const updatedUser = new User(
                updatedRows[0].uuid,
                updatedRows[0].name,
                updatedRows[0].last_name,
                updatedRows[0].phone_number,
                updatedRows[0].email,
                updatedRows[0].password,
                updatedRows[0].loan_status,
                updatedRows[0].status
            );

            return updatedUser;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error; // O maneja el error de la manera que prefieras.
        }

    }

    async updatePassword(uuid: string, password: string): Promise<User | null> {
        try {
            // Asumiendo que 'password' ya está cifrado.
            const sql = 'UPDATE users SET password = ? WHERE uuid = ?';
            const result:any = await query(sql, [password, uuid]);

            // Verificar si se actualizó alguna fila
            if(!result || result.affectedRows === 0) return null;

            // Obtener el usuario actualizado
            const [updatedRows]: any = await query('SELECT * FROM users WHERE uuid = ?', [uuid]);
            if (updatedRows.length === 0) return null;

            const updatedUser = new User(
                updatedRows[0].uuid, 
                updatedRows[0].name, 
                updatedRows[0].last_name, 
                updatedRows[0].phone_number, 
                updatedRows[0].email, 
                updatedRows[0].password, 
                updatedRows[0].loan_status, 
                updatedRows[0].status
            );

            return updatedUser;
        } catch (error) {
            console.error('Error updating password:', error);
            throw error; // O maneja el error de la manera que prefieras.
        }
    }



    async deleteUserById(uuid: string): Promise<string | null> {
        try {
            const sql = 'DELETE FROM users WHERE uuid = ?';
            const result:any = await query(sql, [uuid]);

            if(!result || result.affectedRows === 0) return 'No user found with the provided UUID.';

            return 'User deleted successfully.';
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error; // O maneja el error de la manera que prefieras.
        }
    }

    async activateUser(uuid: string): Promise<string | null> {
        try {
           
            const sql = 'UPDATE users SET status = true WHERE uuid = ?';
            const [resultSet]: any = await query(sql, [uuid]);
            console.log(resultSet.affectedRows);

            if (!resultSet || resultSet.affectedRows === 0) {
                return null;
            }
                    
            return 'User activated successfully.';
        } catch (error) {
            console.error('Error activating user:', error);
            throw error; // O maneja el error de la manera que prefieras.
        }
    }


}