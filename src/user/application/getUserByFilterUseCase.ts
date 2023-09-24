import { User } from "../domain/user";
import { IUsuarioRepository } from "../domain/userRepository";


export class GetUserByFilterUseCase {
    constructor(readonly usuarioRepository: IUsuarioRepository) {}
    
    async run(filter: string,  email?:string, name?:string, phone_number?: string): Promise<User| User[] |null> {
        try {
            const listuserByEmail = await this.usuarioRepository.getUserByFilter(filter,email, name, phone_number);
            return listuserByEmail;
        } catch (error) {
            return null;
        }
    }
}