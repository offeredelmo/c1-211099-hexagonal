import { query } from "../../databse/connect";
import { User } from "../domain/user";
import { IUsuarioRepository } from "../domain/userRepository";


export class MysqlUserRepository implements IUsuarioRepository {
   
    
    async registerUser(uuid: string, name: string, last_name: string, phone_number: string, email: string, password: string, loan_status: boolean, status: boolean): Promise<User | null | void> {
        try {
            let sql = "INSERT INTO users(uuid, name, last_name, phone_number , email, password, loan_status,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            const params: any[] = [uuid, name, last_name, phone_number , email, password, loan_status, status];
            const [result]: any = await query(sql, params);
            return new User(uuid, name, last_name, phone_number , email, password, loan_status, status);
        } catch (error) {
            return null;
        }
    }

    async listAllUsers(): Promise<User[] | null> {
        try {
            const sql = "SELECT * FROM users";
            const [rows]:any = await query(sql); // Esto probablemente devuelve un tipo de dato más complejo
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
            switch(filter) {
                case 'email':
                    if(!email) throw new Error('Email is required when filter is email');
                    sql = 'SELECT * FROM users WHERE email = ?'; // Se ha removido LIMIT 1
                    value = email;
                    break;
                case 'name':
                    if(!name) throw new Error('Name is required when filter is name');
                    sql = 'SELECT * FROM users WHERE name = ?'; // Se ha removido LIMIT 1
                    value = name;
                    break;
                case 'phone_number':
                    if(!phone_number) throw new Error('Phone number is required when filter is phone_number');
                    sql = 'SELECT * FROM users WHERE phone_number = ?'; // Se ha removido LIMIT 1
                    value = phone_number;
                    break;
                default:
                    throw new Error('Invalid filter type');
            }
            
            const [rows]: any = await query(sql, [value]);
            if (!rows || rows.length === 0) return null;
            
            return rows.map((row:User) => new User(row.uuid, row.name, row.last_name, row.phone_number, row.email, row.password, row.loan_status, row.status));
            
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    
     
    

   
}