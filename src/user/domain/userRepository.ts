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

    loginUser(email:string, password:string):Promise<string | null> 

    listAllUsers(): Promise<User[] | null> 

    listAllUserIactive(): Promise<User[] | User | null> 

    getUserByFilter( 
        filter: string,
        email?: string,
        name?: string,
        phone_number?: string
    ): Promise<User | User[] | null>

    getUserById(uuid: string): Promise<User | null> 

    updateUserById(
        uuid: string,
        name?: string,
        last_name?: string,
        phone_number?: string,
        email?: string,
    ): Promise<User | null>

    updatePassword(uuid: string, password: string): Promise<User | null> 

    deleteUserById(uuid: String): Promise<string | null> 

    activateUser(uuid: string): Promise<string | null> 

    inactivateUser(uuid: string):Promise<string | null>

}

