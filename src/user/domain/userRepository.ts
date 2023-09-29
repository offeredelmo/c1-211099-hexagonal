import { User } from "./user";

export interface IUsuarioRepository {
    registerUser( //ya se valida class //listo
        uuid: string,
        name: string,
        last_name: string,
        phone_number: string,
        email: string,
        password: string,
        loan_status: boolean,
        status: boolean
    ): Promise<User | null | string | Error> ;

    loginUser(email:string, password:string):Promise<string | null>  //listo

    listAllUsers(): Promise<User[] | null> //listo

    listAllUserIactive(): Promise<User[] | User | null> //listo

    getUserByFilter( //listo
        filter: string,
        email?: string,
        name?: string,
        phone_number?: string
    ): Promise<User | User[] | null>

    getUserById(uuid: string): Promise<User | null>  //listo

    updateUserById( //listo 
        uuid: string,
        name?: string,
        last_name?: string,
        phone_number?: string,
        email?: string,
    ): Promise<User | null>

    updatePassword(uuid: string, password: string): Promise<User | null>  //listo

    deleteUserById(uuid: String): Promise<string | null> //listo

    activateUser(uuid: string): Promise<string | null> //listo

    inactivateUser(uuid: string):Promise<string | null>

}

