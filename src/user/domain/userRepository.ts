import { User } from "./user";

export interface IUsuarioRepository {
    registerUser( //ya se valida class
        uuid: string,
        name: string,
        last_name: string,
        phone_number: string,
        email: string,
        password: string,
        loan_status: boolean,
        status: boolean
    ): Promise<User | null | void>;

    loginUser(email:string, password:string):Promise<string | null> // ya se valida class

    listAllUsers(): Promise<User[] | null> // no necesita validacion

    listAllUserIactive(): Promise<User[] | User | null> // no necesita validacion

    getUserByFilter( // ya se valida class
        filter: string,
        email?: string,
        name?: string,
        phone_number?: string
    ): Promise<User | User[] | null>

    getUserById(uuid: string): Promise<User | null> //ya se validacion class

    updateUserById(
        uuid: string,
        name?: string,
        last_name?: string,
        phone_number?: string,
        email?: string,
    ): Promise<User | null>

    updatePassword(uuid: string, password: string): Promise<User | null> //ya se valida class

    deleteUserById(uuid: String): Promise<string | null> //ya validacion class

    activateUser(uuid: string): Promise<string | null> //ya se valida class

}

