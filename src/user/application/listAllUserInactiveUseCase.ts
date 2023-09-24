import { User } from "../domain/user";
import { IUsuarioRepository } from "../domain/userRepository";


export class ListAllUserActiveUseCase {
    constructor(readonly usuarioRepository: IUsuarioRepository) {}
    
    async run(): Promise<User[] | User | null> {
        try {
            const listAllUser = await this.usuarioRepository.listAllUserIactive()
            return listAllUser;
        } catch (error) {
            return null;
        }
    }
}