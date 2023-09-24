import { User } from "./user";

export interface IUsuarioRepository {
    registerUser(
        uuid: string,
        name: string,
        last_name: string, 
        phone_number: string,
        email: string,
        password: string,
        loan_status: boolean,
        status: boolean
        ): Promise<User|null|void>;
    listAllUsers():Promise<User[] | null>
    listAllUserIactive():Promise<User[] | User | null>
    getUserByFilter(filter: string,  email?:string, name?:string, phone_number?: string ):Promise<User | User[] | null>

}

