import { User } from "../domain/user";
import { IUsuarioRepository } from "../domain/userRepository";


export class ListAllUserUseCase {
    constructor(readonly usuarioRepository: IUsuarioRepository) {}
    
    async run(): Promise<User[] | null> {
        try {
            const listAllUser = await this.usuarioRepository.listAllUsers()
            return listAllUser;
        } catch (error) {
            return null;
        }
    }
}