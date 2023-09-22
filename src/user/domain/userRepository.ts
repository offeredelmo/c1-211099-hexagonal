import { User } from "./user";

export interface IUsuarioRepositorio {
    listAllUsers(): Promise<User[] | null>
    listAllUsersInactive(status: boolean ): Promise<User[] | null>
    listUserByAttribute(attribute: string): Promise<User[] | null>//posiblemente cambiarlo a int 1:email 2: nombre 3: celular
    getUserById(id:number): Promise<User | null>;
    addUser(user: User): Promise<void>;
    updateUser(user: User): Promise<void>;
    updatePasswordr(id: string, password: String): Promise<void>;
    deleteUser(id: string):  Promise<void>;
    activateUser(onOff: boolean ):  Promise<void>;
}

