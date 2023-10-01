import { User } from "../domain/user";
import { IUsuarioRepository } from "../domain/userRepository";


export class ListAllUserInactiveUseCase {
    constructor(readonly usuarioRepository: IUsuarioRepository) {}
    
    async run(): Promise<User[] | User | null> {
        try {
            const listAllinactive = await this.usuarioRepository.listAllUserInactive()
            return listAllinactive;
        } catch (error) {
            return null;
        }
    }
}